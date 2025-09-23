import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface SignatureRequest {
  folder?: string
  tags?: string[]
  resource_type?: string
  upload_preset?: string
  use_filename?: boolean
  unique_filename?: boolean
  public_id?: string
  transformation?: string
  eager?: string
  context?: Record<string, string>
  metadata?: Record<string, string>
}

interface SignatureResponse {
  signature: string
  timestamp: number
  api_key: string
  cloud_name: string
}

async function generateSignature(params: Record<string, any>, apiSecret: string): Promise<string> {
  // Remove signature and api_key from params if they exist
  const { signature, api_key, ...paramsToSign } = params

  // Sort parameters alphabetically and create query string
  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map(key => {
      const value = paramsToSign[key]
      if (Array.isArray(value)) {
        return `${key}=${value.join(',')}`
      }
      return `${key}=${value}`
    })
    .join('&')

  // Append API secret
  const stringToSign = `${sortedParams}${apiSecret}`

  // Generate SHA-1 hash using Web Crypto API
  const encoder = new TextEncoder()
  const data = encoder.encode(stringToSign)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Get environment variables
    const cloudinaryApiSecret = Deno.env.get('CLOUDINARY_API_SECRET')
    const cloudinaryApiKey = Deno.env.get('CLOUDINARY_API_KEY')
    const cloudinaryCloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME')

    if (!cloudinaryApiSecret || !cloudinaryApiKey || !cloudinaryCloudName) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing Cloudinary configuration. Please set CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, and CLOUDINARY_CLOUD_NAME in Supabase secrets.' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse request body
    const body: SignatureRequest = await req.json()

    // Generate timestamp
    const timestamp = Math.round(Date.now() / 1000)

    // Prepare parameters for signature generation
    const params: Record<string, any> = {
      timestamp,
    }

    // Add optional parameters if provided
    if (body.folder) params.folder = body.folder
    if (body.tags && body.tags.length > 0) params.tags = body.tags.join(',')
    if (body.resource_type) params.resource_type = body.resource_type
    if (body.upload_preset) params.upload_preset = body.upload_preset
    if (body.use_filename !== undefined) params.use_filename = body.use_filename
    if (body.unique_filename !== undefined) params.unique_filename = body.unique_filename
    if (body.public_id) params.public_id = body.public_id
    if (body.transformation) params.transformation = body.transformation
    if (body.eager) params.eager = body.eager
    if (body.context) {
      params.context = Object.entries(body.context)
        .map(([key, value]) => `${key}=${value}`)
        .join('|')
    }
    if (body.metadata) {
      params.metadata = Object.entries(body.metadata)
        .map(([key, value]) => `${key}=${value}`)
        .join('|')
    }

    // Generate signature
    const signature = await generateSignature(params, cloudinaryApiSecret)

    // Return signature data
    const response: SignatureResponse = {
      signature,
      timestamp,
      api_key: cloudinaryApiKey,
      cloud_name: cloudinaryCloudName,
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error generating Cloudinary signature:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate signature',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})