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
    addresses: AssociatedAddress;
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
 
