export interface BusinessSettings {
  businessName: string;
  phone: string;
  email: string;
  address: string;

  currency: string;

  logo?: string;
}

export interface InventorySettings {
  defaultReorderLevel: number;

  preventNegativeStock: boolean;

  lowStockNotifications: boolean;
}

export interface NotificationSettings {
  lowStock: boolean;
  outOfStock: boolean;
  purchases: boolean;

  emailNotifications: boolean;
}
