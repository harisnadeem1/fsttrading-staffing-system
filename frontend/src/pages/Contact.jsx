import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    toast({
      title: "Please fill in all required fields",
      variant: "destructive",
      duration: 3000,
    });
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error('Failed to send message');

    setIsSubmitted(true);
    toast({ title: t.contactSuccess });
  } catch (err) {
    toast({
      title: "Something went wrong. Please try again later.",
      variant: "destructive"
    });
  }
};

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>{t.companyName} - Message Sent</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full"
          >
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                <p className="text-gray-600 mb-6">{t.contactSuccess}</p>
                <Button onClick={() => setIsSubmitted(false)} className="w-full">
                  Send Another Message
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t.companyName} - {t.contactTitle}</title>
        <meta name="description" content={t.contactSubtitle} />
      </Helmet>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.contactTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">{t.fullName} *</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">{t.subject} *</Label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        type="text" 
                        required 
                        value={formData.subject} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">{t.message} *</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      {t.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.companyName}</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-1 text-blue-800" />
                    <span>{t.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-blue-800" />
                    <span>{t.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-blue-800" />
                    <span>{t.phone}</span>
                  </div>
                  {/* <div className="border-t border-gray-200 my-4"></div>
                  <p>{t.kvk}</p>
                  <p>{t.director}</p> */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;