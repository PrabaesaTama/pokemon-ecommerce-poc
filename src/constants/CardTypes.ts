export const SLUG_CONVERTERS = {
  FOILS: {
    normal: "Normal",
    holofoil: "Holofoil",
    "reverse-holofoil": "Reverse Holofoil",
    "1st-edition": "1st Edition",
    "1st-edition-holofoil": "1st Edition Holofoil",
    unlimited: "Unlimited Edition",
    "unlimited-holofoil": "Unlimited Edition Holofoil",
  } as const,
};

export const SlugConverter = {
  foil: (slug: string) => {
    return (
      SLUG_CONVERTERS.FOILS[slug as keyof typeof SLUG_CONVERTERS.FOILS] || slug
    );
  },
};

export type FoilType = keyof typeof SLUG_CONVERTERS.FOILS;
