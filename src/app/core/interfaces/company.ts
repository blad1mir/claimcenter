export interface Company {
    enterprise_id: number;
    created_on: string;
    modified_on: string;
    name: string;
    legal_document: string;
    is_private: boolean;
    web_page_url: string;
    active: boolean;
    finance_details: AssociatedFinanceDetails;
    bank_details: AssociatedBanks;
    created_by: null | any;
    modified_by: null | any;
    addresses: AssociatedAddress[];
    emails_associated: AssociatedEmail[];
    phones_associated: AssociatedPhone[];
    categories: object[];
 }

 export interface AssociatedFinanceDetails {
    accounting_code: string;
    fare: string;
}

 export interface AssociatedBanks {
    bank_name: string;
    account_number: string;
    bank_abbr: string;
}

 export interface AssociatedEmail {
    email: string;
    description: string;
}

export interface AssociatedPhone {
    number: string;
    description: string;
}

export interface AssociatedAddress {
    street: string;
    city: string;
    zip_code: string;
    state: string;
    country: string;
}


export interface Usuario {
    user: {
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      password_confirmation: string;
    };
    profile: {
      second_last_name: string;
      middle_name: string;
      profile_info: string;
      enterprise: number;
      legal_document: string;
      is_private: boolean;
      bank_details: {
        bank_name: string;
        account_number: string;
        bank_abbr: string;
      };
      finance_details: {
        accounting_code: string;
      };
      categories: number[];
      phones_associated: {
        phone_number: string;
        description: string;
        phone_type: string;
      }[];
      emails_associated: {
        email: string;
        description: string;
      }[];
      addresses: {
        country: string;
        state: string;
        city: string;
        street: string;
        zip_code: string;
      }[];
      claims_handler: string;
    };
    roles: string[];
  }

  export interface Contacto {
    profile: {
      profile_id: number;
      legal_document: string;
      second_last_name: string;
      phone: string;
    };
    user: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      roles: string;
    };
  }
