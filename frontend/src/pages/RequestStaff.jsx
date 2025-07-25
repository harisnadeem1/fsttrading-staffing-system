import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { toast } from '@/components/ui/use-toast';

const RequestStaff = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceNeeded: '',
    typeOfWorkers: '',
    duration: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, serviceNeeded: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.companyName || !formData.contactName || !formData.email || !formData.typeOfWorkers || !formData.serviceNeeded) {
    toast({
      title: "Please fill in all required fields",
      variant: "destructive",
      duration: 3000,
    });
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    setIsSubmitted(true);
    toast({
      title: "✅ Request submitted successfully",
      description: "We'll get back to you shortly.",
      duration: 5000,
    });
  } catch (err) {
    toast({
      title: "Error submitting request",
      description: err.message || 'Please try again later.',
      variant: "destructive"
    });
  }
};


  const faqItems = [
    { q: "How quickly can we get staff?", a: "Typically, we can provide suitable candidates within 24-72 hours, depending on the role's complexity and your specific requirements." },
    { q: "Do you provide contracts and insurance?", a: "Yes, for both Temporary Staffing and Personnel Lending, we handle all employment contracts, payroll, taxes, and necessary insurance, ensuring full legal compliance." },
    { q: "What if we need to change the number of workers?", a: "Our services are flexible. You can easily scale your temporary workforce up or down based on your project needs. Just contact your account manager." },
    { q: "What industries do you specialize in?", a: "We have extensive experience in logistics, warehousing, retail, hospitality, and administrative support, but we can source talent for various other sectors as well." },
  ];

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>{t.companyName} - Request Submitted</title>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted!</h2>
                <p className="text-gray-600 mb-6">{t.requestSuccess}</p>
                <Button onClick={() => setIsSubmitted(false)} className="w-full">
                  Submit Another Request
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
        <title>{t.companyName} - {t.requestStaff}</title>
        <meta name="description" content="Request temporary staff for your business needs. FST Trading provides qualified personnel for various industries." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.requestStaff}
            </h1>
            <p className="text-lg text-gray-600">
              Tell us about your staffing needs and we'll find the right people for your business
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Staff Request Form</CardTitle>
                <CardDescription>
                  Please provide details about your staffing requirements. Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">{t.companyNameLabel} *</Label>
                      <Input 
                        id="companyName" 
                        name="companyName" 
                        type="text" 
                        required 
                        value={formData.companyName} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">{t.contactNameLabel} *</Label>
                      <Input 
                        id="contactName" 
                        name="contactName" 
                        type="text" 
                        required 
                        value={formData.contactName} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">{t.email} *</Label>
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
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="serviceNeeded">{t.serviceNeeded} *</Label>
                    <Select value={formData.serviceNeeded} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="serviceNeeded" className="w-full mt-1 text-base">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Temporary Staffing">{t.tempStaffing}</SelectItem>
                        <SelectItem value="Personnel Lending">{t.personnelLending}</SelectItem>
                        <SelectItem value="Employment Mediation">{t.employmentMediation}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="typeOfWorkers">{t.typeOfWorkersLabel} *</Label>
                      <Input 
                        id="typeOfWorkers" 
                        name="typeOfWorkers" 
                        type="text" 
                        required 
                        value={formData.typeOfWorkers} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                        placeholder="e.g., Warehouse staff" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">{t.durationLabel}</Label>
                      <Input 
                        id="duration" 
                        name="duration" 
                        type="text" 
                        value={formData.duration} 
                        onChange={handleInputChange} 
                        className="mt-1 text-base" 
                        placeholder="e.g., 3 months" 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">{t.notesLabel}</Label>
                    <Textarea 
                      id="notes" 
                      name="notes" 
                      rows={4} 
                      value={formData.notes} 
                      onChange={handleInputChange} 
                      className="mt-1 text-base" 
                      placeholder="Please provide additional details..." 
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {t.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked by Employers</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};

export default RequestStaff;