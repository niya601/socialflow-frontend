import React from 'react';
import { LandingHeader } from '../components/layout/LandingHeader';
import { Footer } from '../components/landing/Footer';
import { Shield, Lock, Eye, Server, AlertTriangle, CheckCircle } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest using industry-standard AES-256 encryption.',
  },
  {
    icon: Shield,
    title: 'SOC 2 Compliance',
    description: 'We maintain SOC 2 Type II compliance with regular third-party security audits.',
  },
  {
    icon: Server,
    title: 'Secure Infrastructure',
    description: 'Our infrastructure is hosted on AWS with enterprise-grade security controls.',
  },
  {
    icon: Eye,
    title: 'Access Controls',
    description: 'Role-based access controls and multi-factor authentication protect your accounts.',
  },
  {
    icon: AlertTriangle,
    title: 'Threat Monitoring',
    description: '24/7 security monitoring and automated threat detection systems.',
  },
  {
    icon: CheckCircle,
    title: 'Regular Audits',
    description: 'Quarterly security assessments and penetration testing by certified professionals.',
  },
];

const certifications = [
  { name: 'SOC 2 Type II', description: 'Security, availability, and confidentiality controls' },
  { name: 'ISO 27001', description: 'Information security management systems' },
  { name: 'GDPR Compliant', description: 'European data protection regulations' },
  { name: 'CCPA Compliant', description: 'California consumer privacy act' },
];

export const SecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Enterprise-Grade
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Security
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Your data security is our top priority. Learn about our comprehensive security measures and compliance standards.
          </p>
        </div>
      </section>

      {/* Security Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '256-bit', label: 'AES Encryption' },
              { value: '24/7', label: 'Security Monitoring' },
              { value: '0', label: 'Data Breaches' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Security Measures</h2>
            <p className="text-xl text-gray-600">Multi-layered security approach to protect your data</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Data Protection & Privacy</h2>
              <p className="text-lg text-gray-600 mb-8">
                We implement multiple layers of security to ensure your data remains private and secure. 
                Our commitment to data protection goes beyond compliance requirements.
              </p>
              
              <div className="space-y-6">
                {[
                  'Data encrypted at rest and in transit',
                  'Regular security audits and penetration testing',
                  'Strict access controls and authentication',
                  'Automated backup and disaster recovery',
                  'GDPR and CCPA compliance',
                  'Zero-trust security architecture',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Security Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Security Practices</h2>
            <p className="text-xl text-gray-600">Detailed overview of our security implementation</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Infrastructure Security</h3>
                <p className="text-gray-600 mb-4">
                  Our infrastructure is built on Amazon Web Services (AWS) with enterprise-grade security controls. 
                  We utilize AWS's security features including VPCs, security groups, and IAM roles to ensure 
                  proper network isolation and access control.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Multi-region deployment for high availability</li>
                  <li>Automated security patching and updates</li>
                  <li>Network segmentation and firewalls</li>
                  <li>DDoS protection and traffic filtering</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Security</h3>
                <p className="text-gray-600 mb-4">
                  We follow secure coding practices and implement multiple security layers in our application:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Input validation and sanitization</li>
                  <li>SQL injection and XSS protection</li>
                  <li>Secure session management</li>
                  <li>Rate limiting and abuse prevention</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h3>
                <p className="text-gray-600 mb-4">
                  Your data is protected using industry-standard encryption and security practices:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 encryption for data in transit</li>
                  <li>Encrypted database backups</li>
                  <li>Secure key management with AWS KMS</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Access Control</h3>
                <p className="text-gray-600 mb-4">
                  We implement strict access controls to ensure only authorized personnel can access systems:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Multi-factor authentication (MFA) required</li>
                  <li>Role-based access control (RBAC)</li>
                  <li>Regular access reviews and audits</li>
                  <li>Principle of least privilege</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Incident Response</h2>
            <p className="text-xl text-gray-600">Our commitment to transparency and rapid response</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Detection',
                description: 'Automated monitoring systems detect potential security incidents 24/7.',
              },
              {
                step: '2',
                title: 'Response',
                description: 'Our security team responds immediately to contain and assess the situation.',
              },
              {
                step: '3',
                title: 'Communication',
                description: 'We notify affected customers within 72 hours with transparent updates.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our security team is here to address any concerns or questions you may have.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report a Security Issue</h3>
                <p className="text-gray-600 mb-4">
                  If you discover a security vulnerability, please report it responsibly.
                </p>
                <a
                  href="mailto:security@socialflow.com"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Report Vulnerability
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Security Inquiries</h3>
                <p className="text-gray-600 mb-4">
                  For general security questions or compliance documentation.
                </p>
                <a
                  href="mailto:security@socialflow.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Contact Security Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};