export interface Settings {
  contact: Contact;
  social: Social;
  system: System;
}

export interface Contact {
  contact_email: string;
  contact_location: string;
  contact_phone: string;
  whatsapp?: WhatsApp;
}

export interface WhatsApp {
  phone: string;
  default_message: string;
  is_active: boolean;
  open_in_new_tab: boolean;
}

export interface Social {
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
  social_threads: string;
  social_twitter: string;
  social_tiktok: string;
}

export interface System {
  is_maintenance_mode: boolean;
}
