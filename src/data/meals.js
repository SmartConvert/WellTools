import { TrendingDown, Activity, Heart, Apple } from 'lucide-react';

export const mealCategories = {
    weightLoss: {
        title: 'about_meals_title',
        icon: TrendingDown,
        color: 'from-emerald-400 to-teal-500',
        meals: [
            { name: 'meal_chicken_salad', calories: 350, protein: '35g', carbs: '20g', fat: '12g' },
            { name: 'meal_veggie_stir_fry', calories: 280, protein: '18g', carbs: '32g', fat: '8g' },
            { name: 'meal_baked_salmon', calories: 400, protein: '38g', carbs: '15g', fat: '20g' },
            { name: 'meal_yogurt_bowl', calories: 220, protein: '15g', carbs: '28g', fat: '5g' },
            { name: 'meal_quinoa_bowl', calories: 320, protein: '14g', carbs: '48g', fat: '7g' }
        ]
    },
    diabetes: {
        title: 'diabetes_friendly_meals',
        icon: Activity,
        color: 'from-blue-400 to-indigo-500',
        meals: [
            { name: 'meal_lentil_soup', calories: 250, protein: '14g', carbs: '38g', fat: '4g', gi: 'Low' },
            { name: 'meal_grilled_fish', calories: 320, protein: '35g', carbs: '12g', fat: '15g', gi: 'Low' },
            { name: 'meal_chicken_cauliflower', calories: 290, protein: '32g', carbs: '18g', fat: '10g', gi: 'Low' },
            { name: 'meal_egg_white_omelet', calories: 180, protein: '20g', carbs: '8g', fat: '7g', gi: 'Low' },
            { name: 'meal_turkey_wraps', calories: 240, protein: '28g', carbs: '10g', fat: '9g', gi: 'Low' }
        ]
    },
    bloodPressure: {
        title: 'blood_pressure_friendly_meals',
        icon: Heart,
        color: 'from-rose-400 to-pink-500',
        meals: [
            { name: 'meal_oatmeal_banana', calories: 320, protein: '10g', sodium: '5mg', potassium: 'High' },
            { name: 'meal_baked_chicken_potato', calories: 380, protein: '35g', sodium: '80mg', potassium: 'High' },
            { name: 'meal_spinach_avocado', calories: 240, protein: '8g', sodium: '40mg', potassium: 'High' },
            { name: 'meal_grilled_salmon_kale', calories: 410, protein: '38g', sodium: '95mg', potassium: 'High' },
            { name: 'meal_bean_stew', calories: 280, protein: '15g', sodium: '120mg', potassium: 'High' }
        ]
    },
    healthy: {
        title: 'general_healthy_meals',
        icon: Apple,
        color: 'from-amber-400 to-orange-500',
        meals: [
            { name: 'meal_mediterranean_bowl', calories: 450, protein: '22g', carbs: '52g', fat: '18g' },
            { name: 'meal_chicken_brown_rice', calories: 420, protein: '40g', carbs: '45g', fat: '8g' },
            { name: 'meal_veggie_pasta', calories: 380, protein: '14g', carbs: '58g', fat: '12g' },
            { name: 'meal_smoothie_bowl', calories: 340, protein: '12g', carbs: '54g', fat: '10g' },
            { name: 'meal_tuna_sandwich', calories: 360, protein: '28g', carbs: '38g', fat: '10g' }
        ]
    },
    weightGain: {
        title: 'food_recommendations_gain',
        icon: Scale,
        color: 'from-violet-400 to-purple-500',
        meals: [
            { name: 'meal_protein_pancakes', calories: 650, protein: '45g', carbs: '80g', fat: '15g' },
            { name: 'meal_beef_rice_bowl', calories: 820, protein: '55g', carbs: '90g', fat: '25g' },
            { name: 'meal_pasta_meat_sauce', calories: 750, protein: '42g', carbs: '100g', fat: '20g' },
            { name: 'meal_chicken_avocado_wrap', calories: 600, protein: '40g', carbs: '55g', fat: '28g' },
            { name: 'meal_mass_gainer', calories: 550, protein: '35g', carbs: '70g', fat: '18g' }
        ]
    }
};
