-- 0. Clear old tables (if starting fresh)
DROP TABLE IF EXISTS wetland_animals, wetland_birds, wetland_fish, wetland_flora, wetland_insects CASCADE;
DROP TABLE IF EXISTS wetlands, birds, animals, fish, flora, insects CASCADE;

-- 1. Wetlands Table (The Hub)
CREATE TABLE wetlands (
    id SERIAL PRIMARY KEY,
    common_id VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    district VARCHAR(100),
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    description TEXT,
    image_url VARCHAR(255),
    image_url_2 VARCHAR(255),
    image_url_3 VARCHAR(255),
    area_ha DECIMAL(10, 2)
);

-- 2. Species Tables
CREATE TABLE birds (
    id SERIAL PRIMARY KEY,
    common_id VARCHAR(50),
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    local_name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    image_url_2 VARCHAR(255),
    taxonomy_group VARCHAR(100),
    iucn_status VARCHAR(50),
    seasonality VARCHAR(50)
);

CREATE TABLE insects (
    id SERIAL PRIMARY KEY,
    common_id VARCHAR(50),
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    local_name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    image_url_2 VARCHAR(255),
    taxonomy_group VARCHAR(100),
    iucn_status VARCHAR(50),
    role_in_ecosystem VARCHAR(100)
);

CREATE TABLE flora (
    id SERIAL PRIMARY KEY,
    common_id VARCHAR(50),
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    local_name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    image_url_2 VARCHAR(255),
    taxonomy_group VARCHAR(100),
    iucn_status VARCHAR(50),
    plant_type VARCHAR(100)
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    common_id VARCHAR(50),
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    local_name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    image_url_2 VARCHAR(255),
    taxonomy_group VARCHAR(100),
    iucn_status VARCHAR(50)
);

CREATE TABLE fish (
    id SERIAL PRIMARY KEY,
    common_id VARCHAR(50),
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    local_name VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    image_url_2 VARCHAR(255),
    taxonomy_group VARCHAR(100),
    iucn_status VARCHAR(50),
    economic_value VARCHAR(100)
);

-- 3. Junction Tables (The Links)
CREATE TABLE wetland_animals (
    wetland_id INT NOT NULL,
    animal_id INT NOT NULL,
    PRIMARY KEY (wetland_id, animal_id),
    CONSTRAINT fk_wa_wetland FOREIGN KEY (wetland_id) REFERENCES wetlands(id) ON DELETE CASCADE,
    CONSTRAINT fk_wa_animal FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE TABLE wetland_birds (
    wetland_id INT NOT NULL,
    bird_id INT NOT NULL,
    PRIMARY KEY (wetland_id, bird_id),
    CONSTRAINT fk_wb_wetland FOREIGN KEY (wetland_id) REFERENCES wetlands(id) ON DELETE CASCADE,
    CONSTRAINT fk_wb_bird FOREIGN KEY (bird_id) REFERENCES birds(id) ON DELETE CASCADE
);

CREATE TABLE wetland_fish (
    wetland_id INT NOT NULL,
    fish_id INT NOT NULL,
    PRIMARY KEY (wetland_id, fish_id),
    CONSTRAINT fk_wf_wetland FOREIGN KEY (wetland_id) REFERENCES wetlands(id) ON DELETE CASCADE,
    CONSTRAINT fk_wf_fish FOREIGN KEY (fish_id) REFERENCES fish(id) ON DELETE CASCADE
);

CREATE TABLE wetland_flora (
    wetland_id INT NOT NULL,
    flora_id INT NOT NULL,
    PRIMARY KEY (wetland_id, flora_id),
    CONSTRAINT fk_wfl_wetland FOREIGN KEY (wetland_id) REFERENCES wetlands(id) ON DELETE CASCADE,
    CONSTRAINT fk_wfl_flora FOREIGN KEY (flora_id) REFERENCES flora(id) ON DELETE CASCADE
);

CREATE TABLE wetland_insects (
    wetland_id INT NOT NULL,
    insect_id INT NOT NULL,
    PRIMARY KEY (wetland_id, insect_id),
    CONSTRAINT fk_wi_wetland FOREIGN KEY (wetland_id) REFERENCES wetlands(id) ON DELETE CASCADE,
    CONSTRAINT fk_wi_insect FOREIGN KEY (insect_id) REFERENCES insects(id) ON DELETE CASCADE
);
