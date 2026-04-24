import os
import re
from typing import Tuple

import psycopg2
from psycopg2 import sql


def dms_to_decimal(dms_string: str) -> Tuple[float, float]:
    """
    Convert a DMS coordinate pair into decimal latitude/longitude.

    Example input:
    24° 39' 33.360" N, 93° 57' 3.881" E
    """
    coordinate_pattern = re.compile(
        r"(?P<deg>\d+(?:\.\d+)?)\s*°\s*"
        r"(?P<min>\d+(?:\.\d+)?)\s*'\s*"
        r"(?P<sec>\d+(?:\.\d+)?)\s*\"\s*"
        r"(?P<hem>[NSEW])",
        re.IGNORECASE,
    )

    matches = coordinate_pattern.findall(dms_string)
    if len(matches) != 2:
        raise ValueError(f"Invalid DMS string format: {dms_string}")

    def convert(coord_match: Tuple[str, str, str, str]) -> float:
        deg_str, min_str, sec_str, hemisphere = coord_match
        degrees = float(deg_str)
        minutes = float(min_str)
        seconds = float(sec_str)

        decimal = degrees + (minutes / 60.0) + (seconds / 3600.0)
        if hemisphere.upper() in {"S", "W"}:
            decimal *= -1
        return decimal

    latitude_decimal = convert(matches[0])
    longitude_decimal = convert(matches[1])

    return latitude_decimal, longitude_decimal


# Template rows: add remaining wetlands from your source document in this list.
wetlands_data = [
    {
        "name": "Tangjeng",
        "area_ha": 45.73,
        "location": "Tangjeng",
        "district": "Kakching",
        "coordinates": "24° 24' 22.032\" N, 93° 55' 52.824\" E",
    },
    {
        "name": "Utra Pat",
        "area_ha": 59.50,
        "location": "Nambol",
        "district": "Bishnupur",
        "coordinates": "24° 40' 54.408\" N, 93° 49' 2.244\" E",
    },
    {
        "name": "Zaimeng",
        "area_ha": 5.76,
        "location": "Thonglang Akutpa",
        "district": "Kangpokpi",
        "coordinates": "25° 15' 20.376\" N, 93° 45' 10.332\" E",
    },
]


def seed_wetlands() -> None:
    conn = None
    cursor = None

    try:
        conn = psycopg2.connect(
            host=os.getenv("PGHOST", "localhost"),
            dbname=os.getenv("PGDATABASE", "manipur_wetlands"),
            user=os.getenv("PGUSER", "postgres"),
            password="ChinGkheI@123",
            port=int(os.getenv("PGPORT", "5432")),
        )
        cursor = conn.cursor()

        # Ensure ON CONFLICT(name) works even on a fresh schema.
        cursor.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS ux_wetlands_name ON wetlands(name);"
        )

        upsert_query = sql.SQL(
            """
            INSERT INTO wetlands (
                name,
                area_ha,
                location,
                district,
                coordinates,
                latitude,
                longitude
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (name)
            DO UPDATE SET
                area_ha = EXCLUDED.area_ha,
                location = EXCLUDED.location,
                district = EXCLUDED.district,
                coordinates = EXCLUDED.coordinates,
                latitude = EXCLUDED.latitude,
                longitude = EXCLUDED.longitude;
            """
        )

        for wetland in wetlands_data:
            latitude, longitude = dms_to_decimal(wetland["coordinates"])
            cursor.execute(
                upsert_query,
                (
                    wetland["name"],
                    wetland["area_ha"],
                    wetland["location"],
                    wetland["district"],
                    wetland["coordinates"],
                    latitude,
                    longitude,
                ),
            )

        conn.commit()
        print(f"Upsert complete. Processed {len(wetlands_data)} wetlands.")

    except psycopg2.Error as db_err:
        if conn is not None:
            conn.rollback()
        print(f"Database error while seeding wetlands: {db_err}")
        raise
    except Exception as err:
        if conn is not None:
            conn.rollback()
        print(f"Unexpected error while seeding wetlands: {err}")
        raise
    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()


if __name__ == "__main__":
    seed_wetlands()
