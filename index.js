const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic();

async function generateHealthyRecipe(dietaryPreferences = "vegetarian") {
  console.log(`\n🍽️  Generating a healthy ${dietaryPreferences} recipe...\n`);

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate a healthy ${dietaryPreferences} recipe with the following format:

RECIPE NAME: [Name]
SERVINGS: [Number]
TOTAL CALORIES: [Number]
PREP TIME: [Minutes]
COOK TIME: [Minutes]

INGREDIENTS:
[List each ingredient with amount and calories per serving in format: Item - Amount (X calories)]

INSTRUCTIONS:
[Step-by-step cooking instructions]

NUTRITIONAL INFO:
- Protein: [grams]
- Carbs: [grams]
- Fat: [grams]
- Fiber: [grams]

HEALTH BENEFITS:
[Brief explanation of health benefits]

Make sure the recipe is nutritionally balanced and healthy.`,
      },
    ],
  });

  const recipeText =
    message.content[0].type === "text" ? message.content[0].text : "";
  console.log(recipeText);
  return recipeText;
}

async function generateRecipeMenu(dietType = "balanced") {
  console.log(`\n📋 Generating a ${dietType} diet meal plan for the day...\n`);

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Create a daily ${dietType} meal plan with 3 meals. For each meal provide:
- Recipe name
- Total calories
- Brief ingredients list (with calorie counts)
- Quick 2-3 step instructions
- Macronutrient breakdown (protein, carbs, fat)

Format each meal clearly with headers. Target total daily calories: 2000. Make all recipes healthy and balanced.`,
      },
    ],
  });

  const mealPlanText =
    message.content[0].type === "text" ? message.content[0].text : "";
  console.log(mealPlanText);
  return mealPlanText;
}

async function analyzeCalorieIntake(mealDescription = "grilled chicken, brown rice, steamed broccoli") {
  console.log(
    `\n🔍 Analyzing calorie content and nutrition for: "${mealDescription}"\n`
  );

  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: `Analyze the following meal and provide:
1. Estimated total calories
2. Calorie breakdown by ingredient
3. Macronutrient breakdown (protein, carbs, fat, fiber)
4. Health rating (1-10)
5. Suggestions for improvement

Meal: ${mealDescription}

Provide realistic estimates based on typical portion sizes.`,
      },
    ],
  });

  const analysisText =
    message.content[0].type === "text" ? message.content[0].text : "";
  console.log(analysisText);
  return analysisText;
}

async function main() {
  console.log("=".repeat(60));
  console.log("🥗 HEALTHY RECIPE GENERATOR WITH CALORIE COUNTER 🥗");
  console.log("=".repeat(60));

  try {
    // Demo 1: Generate a single recipe
    console.log("\n--- DEMO 1: Generate a Single Recipe ---");
    await generateHealthyRecipe("mediterranean vegetarian");

    console.log("\n" + "=".repeat(60));

    // Demo 2: Generate a daily meal plan
    console.log("\n--- DEMO 2: Generate Daily Meal Plan ---");
    await generateRecipeMenu("low-carb high-protein");

    console.log("\n" + "=".repeat(60));

    // Demo 3: Analyze calorie intake
    console.log("\n--- DEMO 3: Analyze Meal Calories ---");
    await analyzeCalorieIntake(
      "salmon fillet (150g), sweet potato (200g), asparagus (150g), olive oil (1 tbsp)"
    );

    console.log("\n" + "=".repeat(60));
    console.log("✅ Recipe generation and analysis complete!");
    console.log("=".repeat(60));
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();