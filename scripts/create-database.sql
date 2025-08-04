-- Create database schema for AlgoSolver AI platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Algorithm categories
CREATE TABLE IF NOT EXISTS algorithm_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Algorithms table
CREATE TABLE IF NOT EXISTS algorithms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES algorithm_categories(id),
    difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    description TEXT,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Algorithm implementations in different languages
CREATE TABLE IF NOT EXISTS algorithm_implementations (
    id SERIAL PRIMARY KEY,
    algorithm_id INTEGER REFERENCES algorithms(id),
    language VARCHAR(20) NOT NULL,
    code TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User algorithm attempts/solutions
CREATE TABLE IF NOT EXISTS user_solutions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    algorithm_id INTEGER REFERENCES algorithms(id),
    language VARCHAR(20),
    code TEXT,
    status VARCHAR(20) CHECK (status IN ('solved', 'attempted', 'failed')),
    execution_time INTEGER, -- in milliseconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Algorithm tags
CREATE TABLE IF NOT EXISTS algorithm_tags (
    id SERIAL PRIMARY KEY,
    algorithm_id INTEGER REFERENCES algorithms(id),
    tag VARCHAR(50) NOT NULL,
    UNIQUE(algorithm_id, tag)
);

-- User favorites
CREATE TABLE IF NOT EXISTS user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    algorithm_id INTEGER REFERENCES algorithms(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, algorithm_id)
);

-- Algorithm ratings
CREATE TABLE IF NOT EXISTS algorithm_ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    algorithm_id INTEGER REFERENCES algorithms(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, algorithm_id)
);

-- Algorithm views/statistics
CREATE TABLE IF NOT EXISTS algorithm_stats (
    id SERIAL PRIMARY KEY,
    algorithm_id INTEGER REFERENCES algorithms(id),
    views INTEGER DEFAULT 0,
    implementations_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
