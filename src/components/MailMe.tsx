
import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const MailMe = () => {
  const handleMailClick = () => {
    const email = 'sagardeepak2002@gmail.com';
    const subject = 'DevOps Dashboard - Contact';
    const body = 'Hello,\n\nI visited your DevOps Dashboard and would like to get in touch.\n\nBest regards,';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    toast({
      title: "Opening Email Client",
      description: "Your default email client should open with a pre-filled message.",
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white dark:text-gray-100 mb-4">Get In Touch</h2>
        <p className="text-white/70 dark:text-gray-300 text-lg mb-8">
          Have questions or want to collaborate? I'd love to hear from you!
        </p>
        
        <Button
          onClick={handleMailClick}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
        >
          <Mail className="mr-2 h-5 w-5" />
          Mail Me
        </Button>
      </div>
    </section>
  );
};

export default MailMe;
