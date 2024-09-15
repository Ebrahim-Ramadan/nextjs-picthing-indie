'use client'
import {  XIcon } from "lucide-react";
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import LoadingDots from '../Globals/LoadingDots'

interface PlansProps {
  triggerClassName: string;
  triggerText: string | React.ReactNode;
}

export const CancelSubscriptionModal: React.FC<PlansProps> = ({ triggerClassName, triggerText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState<boolean>(false)

  const handleCancel = async () => {
    // Logic for canceling the subscription goes here
    // e.g., send a request to the server to cancel the subscription
    console.log('Subscription canceled');
    setIsOpen(false);
  };

  return (
    <>
      <div className={`flex justify-end ${triggerText == 'Manage Account' ? 'w-full' : ''}`}>
        <button
          className={`font-bold text-center ${triggerClassName}`}
          role="Subscribe"
          id="manage-account"
          onClick={() => setIsOpen(true)}
        >
          <XIcon size='18' className='w-6'/>
          {triggerText}
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={`fixed inset-0 flex justify-center items-center z-50 px-2 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
        <div className={`fixed inset-0 bg-gradient-to-b from-black/40 to-black ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`} aria-hidden="true" onClick={() => setIsOpen(false)} />
        <div className={`relative overflow-y-auto h-auto md:max-h-[90vh] max-h-[80vh] w-full md:max-w-3xl bg-black/40 backdrop-blur-3xl grid gap-8 max-w-7xl mx-auto py-4 md:py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border-2 border-primary-100 ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
          <div className="grid gap-2 w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">Cancel Subscription</h1>
              <button onClick={() => setIsOpen(false)} className='rounded-full bg-primary-300 hover:bg-primary-400 w-6 md:w-8 h-6 md:h-8 flex items-center justify-center'>
                <XIcon className="w-4 md:w-6 h-4 md:h-6" />
              </button>
            </div>
            <p className="text-sm text-primary-800">Are you sure you want to cancel your subscription? This action cannot be undone and you will lose access to the services immediately.</p>
          </div>
<div className="flex justify-end py-4">
<button 
    onClick={async()=>{
        setloading(true)
        setTimeout(() => {
            console.log('Cancel Subscription')
            setloading(false)
        }, 1000);
     
    }}
    disabled={loading}
    className="flex items-center  hover:bg-red-600 bg-red-500 gap-2 px-2 py-2 rounded-xl transition duration-300 md:px-4 disabled:text-primary-700 disabled:bg-primary-100">
       {loading ? (
              <LoadingDots/>      
              ):(
              <XIcon size='18' className='w-6'/>
      )}
       Cancel Subscription
        </button>  
</div>
          
        </div>
      </Dialog>
    </>
  );
}

export default CancelSubscriptionModal;
