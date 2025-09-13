export const estate = "estate";
export const allProducts = "all_products";
export const digitalEquipment = "Digital_Equipment";
export const transportation = "transportation";

// export const allDigitalEquipment = "all_digital_equipment";
export const cellPhoneAndTablets = "cellphone_tablet";
// export const cellPhoneAndTablets = "CELL PHONE & TABLETS";
export const computer = "computer";
export const entertainmentConsole = "console";

export const allBrands = "all_brands";

export const iphone = "iphone";
export const samsung = "samsung";
export const shiaomi = "shiaomi";

export const dell = "dell";
export const hp = "hp";
export const lenovo = "lenovo";
export const apple = "apple";
export const asus = "asus";
export const acer = "acer";
export const msi = "msi";

export const navItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Admin Panel",
    link: "/adminPanel",
  },
  {
    name: "Home",
    link: "/",
  },

  {
    name: "Sign in",
    link: "/signin",
  },
  {
    name: "Listings",
    link: "#",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "profile",
    link: "/profile",
  },
];

export const CategoryItems = [
  // {
  //   name: "ALL PRODUCTS",
  //   value: allProducts,
  //   disabled: true,
  // },
  {
    name: "ESTATE",
    value: estate,
    disabled: false,
  },
  {
    name: "DIGITAL EQUIPMENT",
    value: digitalEquipment,
    disabled: false,
  },
  // {
  //   name: "TRANSPORTATION",
  //   value: transportation,
  //   disabled: true,
  // },
];
export const SubCategoryItemsForDigitalEquiments = [
  {
    name: "cellphone_tablet",
    value: cellPhoneAndTablets,
    disabled: false,
  },
  {
    name: "COMPUTER",
    value: computer,
    disabled: false,
  },
  // {
  //   name: "CONSOLE",
  //   value: entertainmentConsole,
  //   disabled: true,
  // },
  // {
  //   name: "ALL DIGITAL EQUIPMENTS",
  //   value: allDigitalEquipment,
  //   disabled: true,
  // },
];

export const CellPhoneBrands = [
  {
    name: "ALL BRANDS",
    value: allBrands,
  },

  {
    name: "SAMSUNG",
    value: samsung,
  },
  {
    name: "IPHONE",
    value: iphone,
  },
  {
    name: "SHIAOMI",
    value: shiaomi,
  },
  {
    name: "OTHERS",
    value: "others",
  },
];

export const ColorValues = [
  {
    name: "black",
    value: "BLACK",
  },
  {
    name: "white",
    value: "WHITE",
  },
  {
    name: "green",
    value: "GREEN",
  },
  {
    name: "red",
    value: "RED",
  },
  {
    name: "gray",
    value: "GRAY",
  },
  {
    name: "gold",
    value: "GOLD",
  },
  {
    name: "silver",
    value: "SILVER",
  },
  {
    name: "pink",
    value: "PINK",
  },
  {
    name: "blue",
    value: "BLUE",
  },
  {
    name: "yellow",
    value: "YELLOW",
  },
  {
    name: "brown",
    value: "BROWN",
  },
  {
    name: "purple",
    value: "PURPLE",
  },
];

// Storage values for mobile in filter section
export const StorageValues = [
  {
    name: "mb512",
    value: 0.5,
  },
  {
    name: "gb1",
    value: 1,
  },
  {
    name: "gb2",
    value: 2,
  },
  {
    name: "gb3",
    value: 3,
  },
  {
    name: "gb4",
    value: 4,
  },
  {
    name: "gb5",
    value: 5,
  },
  {
    name: "gb6",
    value: 6,
  },
  {
    name: "gb8",
    value: 8,
  },
  {
    name: "gb10",
    value: 10,
  },
  {
    name: "gb12",
    value: 12,
  },
  {
    name: "gb13",
    value: 13,
  },
  {
    name: "gb16",
    value: 16,
  },
  {
    name: "gb20",
    value: 20,
  },
  {
    name: "gb32",
    value: 32,
  },

  {
    name: "gb64",
    value: 64,
  },
  {
    name: "gb128",
    value: 128,
  },
  {
    name: "gb256",
    value: 256,
  },
  {
    name: "gb512",
    value: 512,
  },

  {
    name: "gb640",
    value: 640,
  },
  {
    name: "tb1",
    value: 1024,
  },
  {
    name: "tb2",
    value: 2048,
  },
];

// RAM values for mobile in filter section
export const RAMValues = [
  {
    name: "mb512",
    value: 0.5,
  },
  {
    name: "gb1",
    value: 1,
  },
  {
    name: "gb2",
    value: 2,
  },
  {
    name: "gb3",
    value: 3,
  },
  {
    name: "gb4",
    value: 4,
  },
  {
    name: "gb5",
    value: 5,
  },
  {
    name: "gb6",
    value: 6,
  },
  {
    name: "gb8",
    value: 8,
  },
  {
    name: "gb10",
    value: 10,
  },
  {
    name: "gb12",
    value: 12,
  },
  {
    name: "gb16",
    value: 16,
  },
  {
    name: "gb18",
    value: 18,
  },
  {
    name: "gb20",
    value: 20,
  },
  {
    name: "gb24",
    value: 24,
  },
  {
    name: "gb32",
    value: 32,
  },
  {
    name: "gb64",
    value: 64,
  },
];

// Storage values for mobile when creating a listing
export const CellPhoneStorage = [
  {
    name: "512 MB",
    value: "mb512",
  },
  {
    name: "1 GB",
    value: "gb1",
  },
  {
    name: "2 GB",
    value: "gb2",
  },
  {
    name: "3 GB",
    value: "gb3",
  },
  {
    name: "4 GB",
    value: "gb4",
  },
  {
    name: "5 GB",
    value: "gb5",
  },
  {
    name: "6 GB",
    value: "gb6",
  },
  {
    name: "8 GB",
    value: "gb8",
  },
  {
    name: "10 GB",
    value: "gb10",
  },
  {
    name: "12 GB",
    value: "gb12",
  },
  {
    name: "13 GB",
    value: "gb13",
  },
  {
    name: "16 GB",
    value: "gb16",
  },
  {
    name: "20 GB",
    value: "gb20",
  },
  {
    name: "32 GB",
    value: "gb32",
  },

  {
    name: "64 GB",
    value: "gb64",
  },
  {
    name: "128 GB",
    value: "gb128",
  },
  {
    name: "256 GB",
    value: "gb256",
  },
  {
    name: "512 GB",
    value: "gb512",
  },

  {
    name: "640 GB",
    value: "gb640",
  },
  {
    name: "1 TB",
    value: "tb1",
  },
  {
    name: "2 TB",
    value: "tb2",
  },
];

// RAM values for mobile when creating a listing
export const CellPhoneRAM = [
  {
    name: "512 MB",
    value: "mb512",
  },
  {
    name: "1 GB",
    value: "gb1",
  },
  {
    name: "2 GB",
    value: "gb2",
  },
  {
    name: "3 GB",
    value: "gb3",
  },
  {
    name: "4 GB",
    value: "gb4",
  },
  {
    name: "5 GB",
    value: "gb5",
  },
  {
    name: "6 GB",
    value: "gb6",
  },
  {
    name: "8 GB",
    value: "gb8",
  },
  {
    name: "10 GB",
    value: "gb10",
  },
  {
    name: "12 GB",
    value: "gb12",
  },
  {
    name: "13 GB",
    value: "gb13",
  },
  {
    name: "16 GB",
    value: "gb16",
  },
  {
    name: "18 GB",
    value: "gb18",
  },
  {
    name: "20 GB",
    value: "gb20",
  },
  {
    name: "24 GB",
    value: "gb24",
  },
  {
    name: "32 GB",
    value: "gb32",
  },
  {
    name: "64 GB",
    value: "gb64",
  },
];

// Storage values for computer in filter section
export const ComputerStorageValues = [
  { name: "gb128", value: 128 },
  { name: "gb256", value: 256 },
  { name: "gb512", value: 512 },
  { name: "tb1", value: 1024 },
  { name: "tb2", value: 2048 },
  { name: "tb4", value: 4096 },
  { name: "tb8", value: 8192 },
];

// Storage values for Computer when creating a listing

export const ComputerStorageOptions = [
  { name: "128 GB", value: "gb128" },
  { name: "256 GB", value: "gb256" },
  { name: "512 GB", value: "gb512" },
  { name: "1 TB", value: "tb1" },
  { name: "2 TB", value: "tb2" },
  { name: "4 TB", value: "tb4" },
  { name: "8 TB", value: "tb8" },
];

// Computer brands
export const ComputerBrands = [
  {
    name: "ALL BRANDS",
    value: allBrands,
  },
  {
    name: "DELL",
    value: dell,
  },
  {
    name: "HP",
    value: hp,
  },
  {
    name: "LENOVO",
    value: lenovo,
  },
  {
    name: "APPLE",
    value: apple,
  },
  {
    name: "ASUS",
    value: asus,
  },
  {
    name: "ACER",
    value: acer,
  },
  {
    name: "MSI",
    value: msi,
  },
  {
    name: "OTHERS",
    value: "others",
  },
];

// RAM values for computers (filter section)
export const ComputerRAMValues = [
  { name: "gb4", value: 4 },
  { name: "gb8", value: 8 },
  { name: "gb16", value: 16 },
  { name: "gb32", value: 32 },
  { name: "gb64", value: 64 },
  { name: "gb128", value: 128 },
];

// RAM values for computers when creating a listing
export const ComputerRAMOptions = [
  { name: "4 GB", value: "gb4" },
  { name: "8 GB", value: "gb8" },
  { name: "16 GB", value: "gb16" },
  { name: "32 GB", value: "gb32" },
  { name: "64 GB", value: "gb64" },
  { name: "128 GB", value: "gb128" },
];

export const filterProdcutsBy = [
  {
    name: "LATEST", // this field return the newest products
    value: "createdAt_desc",
  },
  {
    name: "OLDEST",
    value: "createdAt_asc",
  },
  {
    name: "PRICE LOW TO HIGH",
    value: "regularPrice_asc",
  },
  {
    name: "PRICE HIGH TO LOW",
    value: "regularPrice_desc",
  },
];

export const ValidateMobileNumber = (mobileNumber) => {
  const reg = /^\d+$/;
  if (!reg.test(mobileNumber.toString())) {
    return false;
  }
  return true;
};

export const ValidateMobileNumberLength = (mobileNumber) => {
  const length = mobileNumber.length;
  if (length < 10 || length > 10) {
    return false;
  }
  return true;
};

export const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (!regularPrice || regularPrice <= 0) return 0;

  const discount = ((regularPrice - discountPrice) / regularPrice) * 100;
  return parseFloat(discount.toFixed(1)); // one decimal place
};
