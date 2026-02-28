import psycopg2
from psycopg2.extras import DictCursor

# ==========================================
# 1. THE DATA ARRAYS
# ==========================================

birds_data = [
    {"common_name": "Cattle Egret", "scientific_name": "Bubulcus ibis", "local_name": "U-rok San-dung-il", "image_url": "/assets/birds/media/image1.jpeg", "common_id": "AV-001", "taxonomy_group": "Pelecaniformes"},
    {"common_name": "Little Egret", "scientific_name": "Egretta garzetta", "local_name": "U-rok Nao-kang", "image_url": "/assets/birds/media/image2.jpeg", "common_id": "AV-002", "taxonomy_group": "Pelecaniformes"},
    {"common_name": "Intermediate Egret", "scientific_name": "Ardea intermedia", "local_name": "U-rok", "image_url": "/assets/birds/media/image3.jpeg", "common_id": "AV-003", "taxonomy_group": "Pelecaniformes"},
    {"common_name": "Great Egret", "scientific_name": "Ardea alba", "local_name": "U-rok", "image_url": "/assets/birds/media/image4.jpeg", "common_id": "AV-004", "taxonomy_group": "Pelecaniformes"},
    {"common_name": "Grey Heron", "scientific_name": "Ardea cinerea", "local_name": "U-rok", "image_url": "/assets/birds/media/image5.jpeg", "common_id": "AV-005", "taxonomy_group": "Pelecaniformes"}
    # Continue adding your birds here... (image6.jpeg, image7.jpeg)
]

insects_data = [
    # ODONATA (Dragonflies & Damselflies)
    {"common_name": "Blue-Tailed Green Darner", "scientific_name": "Anax junius", "local_name": "", "image_url": "/assets/insects/media/image1.jpeg", "common_id": "IN-001", "taxonomy_group": "Odonata"},
    {"common_name": "Common Clubtail", "scientific_name": "Ictinogomphus rapax", "local_name": "", "image_url": "/assets/insects/media/image2.jpeg", "common_id": "IN-002", "taxonomy_group": "Odonata"},
    {"common_name": "Common Picture Wing", "scientific_name": "Rhyothemis variegata", "local_name": "", "image_url": "/assets/insects/media/image3.jpeg", "common_id": "IN-003", "taxonomy_group": "Odonata"},
    # HEMIPTERA (True Bugs)
    {"common_name": "Water Strider", "scientific_name": "Gerridae", "local_name": "", "image_url": "/assets/insects/media/image4.jpeg", "common_id": "IN-004", "taxonomy_group": "Hemiptera"},
    {"common_name": "Giant Water Bug", "scientific_name": "Lethocerus indicus", "local_name": "", "image_url": "/assets/insects/media/image5.jpeg", "common_id": "IN-005", "taxonomy_group": "Hemiptera"}
    # Continue adding your insects here... (image6.jpeg, image7.jpeg)
]

flora_data = [
    {"common_name": "Blue Snakeweed", "scientific_name": "Stachytarpheta cayennensis", "local_name": "", "image_url": "/assets/flora/media/image1.jpeg", "common_id": "FL-001", "taxonomy_group": "Verbenaceae"},
    {"common_name": "Water Hyacinth", "scientific_name": "Eichhornia crassipes", "local_name": "Kabokang", "image_url": "/assets/flora/media/image2.jpeg", "common_id": "FL-002", "taxonomy_group": "Pontederiaceae"},
    {"common_name": "Manchurian Wild Rice", "scientific_name": "Zizania latifolia", "local_name": "Ishing Kambong", "image_url": "/assets/flora/media/image3.jpeg", "common_id": "FL-003", "taxonomy_group": "Poaceae"},
    {"common_name": "Sacred Lotus", "scientific_name": "Nelumbo nucifera", "local_name": "Thambal", "image_url": "/assets/flora/media/image4.jpeg", "common_id": "FL-004", "taxonomy_group": "Nelumbonaceae"},
    {"common_name": "Water Lily", "scientific_name": "Nymphaea", "local_name": "Thariktha", "image_url": "/assets/flora/media/image5.jpeg", "common_id": "FL-005", "taxonomy_group": "Nymphaeaceae"}
    # Continue adding your flora here... (image6.jpeg, image7.jpeg)
]

# ==========================================
# 2. DATABASE UPSERT LOGIC
# ==========================================

DB_CONFIG = {
    "dbname": "manipur_wetlands",
    "user": "postgres",
    "password": "ChinGkheI@123", # Password added securely
    "host": "localhost",
    "port": "5432"
}

def upsert_data(cursor, table_name, data_list):
    for item in data_list:
        # Check if the common_id already exists
        cursor.execute(f"SELECT id FROM {table_name} WHERE common_id = %s", (item['common_id'],))
        exists = cursor.fetchone()

        if exists:
            # UPDATE existing record
            print(f"Updating '{item['common_name']}' in {table_name}...")
            update_query = f"""
                UPDATE {table_name} 
                SET common_name = %s, scientific_name = %s, local_name = %s, image_url = %s, taxonomy_group = %s
                WHERE common_id = %s
            """
            cursor.execute(update_query, (
                item['common_name'], item['scientific_name'], item['local_name'], 
                item['image_url'], item.get('taxonomy_group', ''), item['common_id']
            ))
        else:
            # INSERT new record
            print(f"Inserting '{item['common_name']}' into {table_name}...")
            insert_query = f"""
                INSERT INTO {table_name} (common_name, scientific_name, local_name, image_url, common_id, taxonomy_group)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (
                item['common_name'], item['scientific_name'], item['local_name'], 
                item['image_url'], item['common_id'], item.get('taxonomy_group', '')
            ))

def main():
    try:
        print("Connecting to PostgreSQL...")
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor(cursor_factory=DictCursor)

        print("\n--- Processing Birds ---")
        upsert_data(cursor, "birds", birds_data)

        print("\n--- Processing Insects ---")
        upsert_data(cursor, "insects", insects_data)

        print("\n--- Processing Flora ---")
        upsert_data(cursor, "flora", flora_data)

        # Commit all changes
        conn.commit()
        print("\n✨ Success! All data processed and saved to the database.")

    except Exception as e:
        print(f"\n❌ An error occurred: {e}")
    finally:
        if 'conn' in locals() and conn:
            cursor.close()
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    main()
