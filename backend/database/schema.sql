CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    calories_per_100g NUMERIC NOT NULL,
    protein_per_100g NUMERIC NOT NULL,
    carbs_per_100g NUMERIC NOT NULL,
    fat_per_100g NUMERIC NOT NULL,
    fiber_per_100g NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    default_servings INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity NUMERIC NOT NULL,
    unit VARCHAR(50) NOT NULL,
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS meal_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    custom_meal_name VARCHAR(255),
    servings_consumed NUMERIC NOT NULL,
    consumed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total_calories NUMERIC NOT NULL,
    total_protein NUMERIC NOT NULL,
    total_carbs NUMERIC NOT NULL,
    total_fat NUMERIC NOT NULL,
    total_fiber NUMERIC NOT NULL
);
