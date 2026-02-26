--
-- PostgreSQL database dump
--

\restrict 7HqlWDiIcyN36ddtPAfT6BbujFa3Acs8l7LkUAwmK7FIf0j8gT2XS6QSpuFeIGu

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.wetland_insects DROP CONSTRAINT IF EXISTS fk_wi_wetland;
ALTER TABLE IF EXISTS ONLY public.wetland_insects DROP CONSTRAINT IF EXISTS fk_wi_insect;
ALTER TABLE IF EXISTS ONLY public.wetland_flora DROP CONSTRAINT IF EXISTS fk_wfl_wetland;
ALTER TABLE IF EXISTS ONLY public.wetland_flora DROP CONSTRAINT IF EXISTS fk_wfl_flora;
ALTER TABLE IF EXISTS ONLY public.wetland_fish DROP CONSTRAINT IF EXISTS fk_wf_wetland;
ALTER TABLE IF EXISTS ONLY public.wetland_fish DROP CONSTRAINT IF EXISTS fk_wf_fish;
ALTER TABLE IF EXISTS ONLY public.wetland_birds DROP CONSTRAINT IF EXISTS fk_wb_wetland;
ALTER TABLE IF EXISTS ONLY public.wetland_birds DROP CONSTRAINT IF EXISTS fk_wb_bird;
ALTER TABLE IF EXISTS ONLY public.wetland_animals DROP CONSTRAINT IF EXISTS fk_wa_wetland;
ALTER TABLE IF EXISTS ONLY public.wetland_animals DROP CONSTRAINT IF EXISTS fk_wa_animal;
ALTER TABLE IF EXISTS ONLY public.wetlands DROP CONSTRAINT IF EXISTS wetlands_pkey;
ALTER TABLE IF EXISTS ONLY public.wetlands DROP CONSTRAINT IF EXISTS wetlands_common_id_key;
ALTER TABLE IF EXISTS ONLY public.wetland_insects DROP CONSTRAINT IF EXISTS wetland_insects_pkey;
ALTER TABLE IF EXISTS ONLY public.wetland_flora DROP CONSTRAINT IF EXISTS wetland_flora_pkey;
ALTER TABLE IF EXISTS ONLY public.wetland_fish DROP CONSTRAINT IF EXISTS wetland_fish_pkey;
ALTER TABLE IF EXISTS ONLY public.wetland_birds DROP CONSTRAINT IF EXISTS wetland_birds_pkey;
ALTER TABLE IF EXISTS ONLY public.wetland_animals DROP CONSTRAINT IF EXISTS wetland_animals_pkey;
ALTER TABLE IF EXISTS ONLY public.insects DROP CONSTRAINT IF EXISTS insects_pkey;
ALTER TABLE IF EXISTS ONLY public.insects DROP CONSTRAINT IF EXISTS insects_common_id_key;
ALTER TABLE IF EXISTS ONLY public.flora DROP CONSTRAINT IF EXISTS flora_pkey;
ALTER TABLE IF EXISTS ONLY public.flora DROP CONSTRAINT IF EXISTS flora_common_id_key;
ALTER TABLE IF EXISTS ONLY public.fish DROP CONSTRAINT IF EXISTS fish_pkey;
ALTER TABLE IF EXISTS ONLY public.fish DROP CONSTRAINT IF EXISTS fish_common_id_key;
ALTER TABLE IF EXISTS ONLY public.birds DROP CONSTRAINT IF EXISTS birds_pkey;
ALTER TABLE IF EXISTS ONLY public.birds DROP CONSTRAINT IF EXISTS birds_common_id_key;
ALTER TABLE IF EXISTS ONLY public.animals DROP CONSTRAINT IF EXISTS animals_pkey;
ALTER TABLE IF EXISTS ONLY public.animals DROP CONSTRAINT IF EXISTS animals_common_id_key;
ALTER TABLE IF EXISTS public.wetlands ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.insects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.flora ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.fish ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.birds ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.animals ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.wetlands_id_seq;
DROP TABLE IF EXISTS public.wetlands;
DROP TABLE IF EXISTS public.wetland_insects;
DROP TABLE IF EXISTS public.wetland_flora;
DROP TABLE IF EXISTS public.wetland_fish;
DROP TABLE IF EXISTS public.wetland_birds;
DROP TABLE IF EXISTS public.wetland_animals;
DROP SEQUENCE IF EXISTS public.insects_id_seq;
DROP TABLE IF EXISTS public.insects;
DROP SEQUENCE IF EXISTS public.flora_id_seq;
DROP TABLE IF EXISTS public.flora;
DROP SEQUENCE IF EXISTS public.fish_id_seq;
DROP TABLE IF EXISTS public.fish;
DROP SEQUENCE IF EXISTS public.birds_id_seq;
DROP TABLE IF EXISTS public.birds;
DROP SEQUENCE IF EXISTS public.animals_id_seq;
DROP TABLE IF EXISTS public.animals;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: animals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.animals (
    id integer NOT NULL,
    common_name character varying(255),
    scientific_name character varying(255),
    local_name character varying(255),
    description text,
    image_url character varying(255),
    common_id character varying(50),
    iucn_status character varying(50)
);


--
-- Name: animals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.animals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: animals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.animals_id_seq OWNED BY public.animals.id;


--
-- Name: birds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.birds (
    id integer NOT NULL,
    common_name character varying(255),
    scientific_name character varying(255),
    local_name character varying(255),
    description text,
    image_url character varying(255),
    common_id character varying(50),
    seasonality character varying(50)
);


--
-- Name: birds_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.birds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: birds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.birds_id_seq OWNED BY public.birds.id;


--
-- Name: fish; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fish (
    id integer NOT NULL,
    common_name character varying(255),
    scientific_name character varying(255),
    local_name character varying(255),
    description text,
    image_url character varying(255),
    common_id character varying(50),
    economic_value character varying(100)
);


--
-- Name: fish_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.fish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: fish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.fish_id_seq OWNED BY public.fish.id;


--
-- Name: flora; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flora (
    id integer NOT NULL,
    common_name character varying(255),
    scientific_name character varying(255),
    local_name character varying(255),
    description text,
    image_url character varying(255),
    common_id character varying(50),
    plant_type character varying(100)
);


--
-- Name: flora_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.flora_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flora_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.flora_id_seq OWNED BY public.flora.id;


--
-- Name: insects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.insects (
    id integer NOT NULL,
    common_name character varying(255),
    scientific_name character varying(255),
    local_name character varying(255),
    description text,
    image_url character varying(255),
    common_id character varying(50),
    role_in_ecosystem character varying(100)
);


--
-- Name: insects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.insects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: insects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.insects_id_seq OWNED BY public.insects.id;


--
-- Name: wetland_animals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wetland_animals (
    wetland_id integer NOT NULL,
    animal_id integer NOT NULL
);


--
-- Name: wetland_birds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wetland_birds (
    wetland_id integer NOT NULL,
    bird_id integer NOT NULL
);


--
-- Name: wetland_fish; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wetland_fish (
    wetland_id integer NOT NULL,
    fish_id integer NOT NULL
);


--
-- Name: wetland_flora; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wetland_flora (
    wetland_id integer NOT NULL,
    flora_id integer NOT NULL
);


--
-- Name: wetland_insects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wetland_insects (
    wetland_id integer NOT NULL,
    insect_id integer NOT NULL
);


--
-- Name: wetlands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wetlands (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(100),
    district character varying(100),
    latitude numeric(10,6),
    longitude numeric(10,6),
    description text,
    image_url character varying(255),
    common_id character varying(50),
    area_sq_km numeric(10,2)
);


--
-- Name: wetlands_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wetlands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wetlands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wetlands_id_seq OWNED BY public.wetlands.id;


--
-- Name: animals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.animals ALTER COLUMN id SET DEFAULT nextval('public.animals_id_seq'::regclass);


--
-- Name: birds id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.birds ALTER COLUMN id SET DEFAULT nextval('public.birds_id_seq'::regclass);


--
-- Name: fish id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fish ALTER COLUMN id SET DEFAULT nextval('public.fish_id_seq'::regclass);


--
-- Name: flora id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flora ALTER COLUMN id SET DEFAULT nextval('public.flora_id_seq'::regclass);


--
-- Name: insects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.insects ALTER COLUMN id SET DEFAULT nextval('public.insects_id_seq'::regclass);


--
-- Name: wetlands id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetlands ALTER COLUMN id SET DEFAULT nextval('public.wetlands_id_seq'::regclass);


--
-- Data for Name: animals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.animals (id, common_name, scientific_name, local_name, description, image_url, common_id, iucn_status) FROM stdin;
1	Sangai	Rucervus eldii eldii	Sangai	State animal of Manipur, found exclusively on floating Phumdis.	assets/animal_sangai.jpg	MAM-001	Endangered
2	Hog Deer	Axis porcinus	Kharsa	Small deer inhabiting tall grasslands of wetlands.	assets/animal_hog_deer.jpg	MAM-002	Endangered
3	Common Otter	Lutra lutra	Sahu	Excellent swimmer feeding on fish in open water.	assets/animal_otter.jpg	MAM-003	Near Threatened
4	Large Indian Civet	Viverra zibetha	Moirang Sathibi	Nocturnal carnivore found in wetland margins.	assets/animal_civet.jpg	MAM-004	Least Concern
5	Wild Boar	Sus scrofa	Lam Ok	Forages for roots and tubers in phumdis.	assets/animal_boar.jpg	MAM-005	Least Concern
6	Jungle Cat	Felis chaus	Lam-houdong	Hunts waterfowl and rodents.	assets/animal_jungle_cat.jpg	MAM-006	Least Concern
7	Golden Jackal	Canis aureus	Keishal	Scavenger found near wetland boundaries.	assets/animal_jackal.jpg	MAM-007	Least Concern
8	Small Indian Civet	Viverricula indica	Moirang Sathibi Macha	Small predator of insects and rodents.	assets/animal_small_civet.jpg	MAM-008	Least Concern
9	Crab-eating Mongoose	Herpestes urva	Urok-labakh	Semi-aquatic mongoose, feeds on crabs/snails.	assets/animal_mongoose.jpg	MAM-009	Least Concern
10	Flying Fox	Pteropus giganteus	Sek-pa	Large fruit bat roosting near water bodies.	assets/animal_flying_fox.jpg	MAM-010	Least Concern
11	Indian Python	Python molurus	Lairen	Large constrictor snake found in marshes.	assets/animal_python.jpg	MAM-011	Near Threatened
12	Water Monitor	Varanus salvator	Hang-kok	Large aquatic lizard.	assets/animal_monitor.jpg	MAM-012	Least Concern
13	Checkered Keelback	Fowlea piscator	Lil-la	Common non-venomous water snake.	assets/animal_keelback.jpg	MAM-013	Least Concern
14	Malayan Box Turtle	Cuora amboinensis	Thanggu	Semi-aquatic turtle.	assets/animal_box_turtle.jpg	MAM-014	Vulnerable
15	Smooth-coated Otter	Lutrogale perspicillata	Sahu-macha	Social otter species.	assets/animal_smooth_otter.jpg	MAM-015	Vulnerable
16	Hoolock Gibbon	Hoolock hoolock	Yongmu	Found in the hills surrounding wetlands.	assets/animal_gibbon.jpg	MAM-016	Endangered
17	Pangolin	Manis pentadactyla	Shaphu	Scaly anteater found in drier margins.	assets/animal_pangolin.jpg	MAM-017	Endangered
18	Barking Deer	Muntiacus muntjak	Sajee	Small deer with a dog-like call.	assets/animal_barking_deer.jpg	MAM-018	Least Concern
19	Rhesus Macaque	Macaca mulatta	Yong	Common monkey found near human settlements.	assets/animal_macaque.jpg	MAM-019	Least Concern
20	Slow Loris	Nycticebus bengalensis	Yong Ikaithibi	Nocturnal primate.	assets/animal_loris.jpg	MAM-020	Endangered
21	Leopard Cat	Prionailurus bengalensis	Keijenglang	Small wild cat with leopard-like spots.	assets/animal_leopard_cat.jpg	MAM-021	Least Concern
\.


--
-- Data for Name: birds; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.birds (id, common_name, scientific_name, local_name, description, image_url, common_id, seasonality) FROM stdin;
1	Lesser Whistling Duck	Dendrocygna javanica	Tingee	Most abundant resident duck, whistles in flight.	assets/bird_tingee.jpg	AV-001	Resident
2	Gadwall	Anas strepera	Nganu Thoidingnum	Dabbling duck visiting in winter.	assets/bird_gadwall.jpg	AV-002	Winter Migrant
3	Spot-billed Duck	Anas poecilorhyncha	Nganu Pirel	Large duck with yellow-tipped bill.	assets/bird_spotbill.jpg	AV-003	Resident
4	Northern Shoveler	Anas clypeata	Nganu Khara	Duck with large spoon-shaped bill.	assets/bird_shoveler.jpg	AV-004	Winter Migrant
5	Northern Pintail	Anas acuta	Meitungnga	Elegant duck with long tail.	assets/bird_pintail.jpg	AV-005	Winter Migrant
6	Common Teal	Anas crecca	Surit	Smallest dabbling duck.	assets/bird_surit.jpg	AV-006	Winter Migrant
7	Red-crested Pochard	Netta rufina	Nganu Mitngoubi	Male has rusty orange head.	assets/bird_pochard.jpg	AV-007	Winter Migrant
8	Ferruginous Pochard	Aythya nyroca	Nganu Meingangbi	Near threatened diving duck.	assets/bird_ferruginous.jpg	AV-008	Winter Migrant
9	Grey-headed Lapwing	Vanellus cinereus	Salang Kak	Wader bird found on muddy shores.	assets/bird_lapwing.jpg	AV-009	Winter Migrant
10	Purple Moorhen	Porphyrio porphyrio	Urak Uchek	Large blue bird with red beak.	assets/bird_moorhen.jpg	AV-010	Resident
11	Asian Openbill	Anastomus oscitans	Thong-ngang-na	Stork with gap in beak for snails.	assets/bird_openbill.jpg	AV-011	Resident
12	Cotton Pygmy Goose	Nettapus coromandelianus	Pedakot	Tiny duck nesting in trees.	assets/bird_pedakot.jpg	AV-012	Resident
13	Little Grebe	Tachybaptus ruficollis	Uthum	Small diving bird.	assets/bird_uthum.jpg	AV-013	Resident
14	Great Cormorant	Phalacrocorax carbo	Ura	Expert fisher, dries wings in sun.	assets/bird_ura.jpg	AV-014	Resident
15	Cattle Egret	Bubulcus ibis	Lang-khong-sang	White bird often seen with cattle.	assets/bird_cattle_egret.jpg	AV-015	Resident
16	Mrs. Hume's Pheasant	Syrmaticus humiae	Nongin	State bird of Manipur.	assets/bird_nongin.jpg	AV-016	Resident
17	Black-headed Ibis	Threskiornis melanocephalus	Mayang Urok	Near threatened wading bird.	assets/bird_ibis.jpg	AV-017	Winter Migrant
18	Glossy Ibis	Plegadis falcinellus	Kwak Urok	Dark bird with metallic sheen.	assets/bird_glossy_ibis.jpg	AV-018	Winter Migrant
19	Common Kingfisher	Alcedo atthis	Nga-rakpi	Bright blue bird that dives for fish.	assets/bird_kingfisher.jpg	AV-019	Resident
20	Pied Kingfisher	Ceryle rudis	Ngarakpi-angoubi	Hovers over water before diving.	assets/bird_pied_kingfisher.jpg	AV-020	Resident
21	White-breasted Waterhen	Amaurornis phoenicurus	Uren	Noisy bird found in marshes.	assets/bird_waterhen.jpg	AV-021	Resident
22	Bronze-winged Jacana	Metopidius indicus	Thambal-tombi	Walks on floating lily pads.	assets/bird_jacana.jpg	AV-022	Resident
23	Sarus Crane	Antigone antigone	Wainu	Tallest flying bird.	assets/bird_sarus.jpg	AV-023	Rare Migrant
\.


--
-- Data for Name: fish; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fish (id, common_name, scientific_name, local_name, description, image_url, common_id, economic_value) FROM stdin;
1	Pengba	Osteobrama belangeri	Pengba	State fish of Manipur, highly prized.	assets/fish_pengba.jpg	F-001	High
2	Ngaton	Labeo bata	Ngaton	Seasonal delicacy.	assets/fish_ngaton.jpg	F-002	Medium
3	Sareng	Wallago attu	Sareng	Freshwater shark, culturally significant.	assets/fish_sareng.jpg	F-003	High
4	Porom	Channa marulius	Porom	Giant snakehead.	assets/fish_porom.jpg	F-004	Medium
5	Meitei Ngamu	Channa punctata	Ngamu	Spotted snakehead, very hardy.	assets/fish_ngamu.jpg	F-005	Medium
6	Ukabi	Anabas testudineus	Ukabi	Climbing perch.	assets/fish_ukabi.jpg	F-006	Medium
7	Ngaprum	Monopterus albus	Ngaprum	Swamp eel.	assets/fish_ngaprum.jpg	F-007	Medium
8	Ngakra	Clarias magur	Ngakra	Walking catfish.	assets/fish_ngakra.jpg	F-008	High
9	Nganap	Pangio pangia	Nganap	Eel-loach.	assets/fish_nganap.jpg	F-009	Low
10	Muka Nga	Amblypharyngodon mola	Muka Nga	Small vitamin-rich fish.	assets/fish_mukanga.jpg	F-010	Low
11	Ngaring	Channa orientalis	Ngaring	Dwarf snakehead.	assets/fish_ngaring.jpg	F-011	Medium
12	Nga-tin	Labeo rohita	Rou	Common carp.	assets/fish_rou.jpg	F-012	Commercial
13	Nga-pamma	Cyprinus carpio	Common Carp	Introduced species, very common.	assets/fish_common_carp.jpg	F-013	Commercial
14	Silver Carp	Hypophthalmichthys molitrix	Silver	Surface feeder.	assets/fish_silver.jpg	F-014	Commercial
15	Grass Carp	Ctenopharyngodon idella	Grass Carp	Feeds on aquatic vegetation.	assets/fish_grass_carp.jpg	F-015	Commercial
16	Nga-khajing	Esomus danricus	Nga-khajing	Flying barb.	assets/fish_khajing.jpg	F-016	Subsistence
17	Nga-sang	Channa striata	Nga-sang	Striped snakehead.	assets/fish_ngasang.jpg	F-017	High
18	Nga-hei	Notopterus notopterus	Nga-hei	Bronze featherback.	assets/fish_ngahei.jpg	F-018	Medium
19	Nganu	Heteropneustes fossilis	Nganu	Stinging catfish.	assets/fish_nganu.jpg	F-019	High
20	Leikoi	Lepidocephalichthys guntea	Leikoi	Loach found in muddy bottoms.	assets/fish_leikoi.jpg	F-020	Low
\.


--
-- Data for Name: flora; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.flora (id, common_name, scientific_name, local_name, description, image_url, common_id, plant_type) FROM stdin;
1	Manipur Wild Rice	Zizania latifolia	Ishing Kambong	Forms the structure of Phumdis.	assets/flora_kambong.jpg	PL-001	Emergent
2	Sacred Lotus	Nelumbo nucifera	Thambal	Culturally significant, edible roots.	assets/flora_thambal.jpg	PL-002	Floating
3	Water Lily	Nymphaea pubescens	Tharo	Common flowering plant.	assets/flora_tharo.jpg	PL-003	Floating
4	Water Chestnut	Trapa natans	Heikak	Produces edible nuts.	assets/flora_heikak.jpg	PL-004	Floating
5	Foxnut	Euryale ferox	Thangjing	Prickly lily with edible seeds.	assets/flora_thangjing.jpg	PL-005	Floating
6	Arrowhead	Sagittaria sagittifolia	Koukha	Tubers are a delicacy.	assets/flora_koukha.jpg	PL-006	Emergent
7	Water Mimosa	Neptunia oleracea	Ishing Ekai Thabi	Edible vegetable.	assets/flora_ekaithabi.jpg	PL-007	Floating
8	Common Reed	Phragmites karka	Tou	Tall grass, habitat for wildlife.	assets/flora_tou.jpg	PL-008	Emergent
9	Water Hyacinth	Eichhornia crassipes	Kabokang	Invasive floating weed.	assets/flora_kabokang.jpg	PL-009	Invasive
10	Water Spinach	Ipomoea aquatica	Kolamni	Common edible green.	assets/flora_kolamni.jpg	PL-010	Creeper
11	Lesser Duckweed	Lemna minor	Kang-macha	Tiny floating plant.	assets/flora_duckweed.jpg	PL-011	Floating
12	Water Cabbage	Pistia stratiotes	Kang-jao	Rosette forming floating plant.	assets/flora_pistia.jpg	PL-012	Floating
13	Kombirei	Iris bakeri	Kombirei	Famous purple iris of Manipur.	assets/flora_kombirei.jpg	PL-013	Marsh
14	Oenanthe	Oenanthe javanica	Komprek	Aromatic herb used in salads.	assets/flora_komprek.jpg	PL-014	Herb
15	Centella	Centella asiatica	Peruk	Medicinal herb.	assets/flora_peruk.jpg	PL-015	Creeper
16	Chameleon Plant	Houttuynia cordata	Toning-khok	Root herb used in garnishing.	assets/flora_toningkhok.jpg	PL-016	Herb
17	Polygonum	Persicaria odorata	Phak-pai	Spicy herb.	assets/flora_phakpai.jpg	PL-017	Herb
18	Alisma	Alisma plantago-aquatica	Kak-thang	Broad leaf marsh plant.	assets/flora_kakthang.jpg	PL-018	Emergent
19	Codd	Eryngium foetidum	Awa-phadigom	Culantro, strong aroma.	assets/flora_awaphadigom.jpg	PL-019	Herb
20	Smartweed	Polygonum barbatum	Yellang	Common marsh weed.	assets/flora_yellang.jpg	PL-020	Weed
\.


--
-- Data for Name: insects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.insects (id, common_name, scientific_name, local_name, description, image_url, common_id, role_in_ecosystem) FROM stdin;
1	Giant Water Bug	Lethocerus indicus	Konjeng Kokphai	Large edible aquatic insect.	assets/insect_water_bug.jpg	INS-001	Predator
2	Water Beetle	Cybister sp.	Tharaikokpi	Edible diving beetle.	assets/insect_cybister.jpg	INS-002	Predator
3	Water Scorpion	Laccotrephes sp.	Naosek	Insect with breathing tube.	assets/insect_water_scorpion.jpg	INS-003	Predator
4	Mole Cricket	Gryllotalpa orientalis	Waheibi	Burrowing insect.	assets/insect_mole_cricket.jpg	INS-004	Decomposer
5	Water Strider	Gerris sp.	Pungka Shabi	Walks on water surface.	assets/insect_strider.jpg	INS-005	Scavenger
6	Dragonfly Nymph	Anisoptera	Tinthrok	Aquatic larva.	assets/insect_nymph.jpg	INS-006	Predator
7	Rice Ear Bug	Leptocorisa oratoria	Phou-Tibi	Pest in paddy fields.	assets/insect_rice_bug.jpg	INS-007	Pest
8	Whirligig Beetle	Gyrinidae	Lai-Tharaikokpi	Swims in circles on surface.	assets/insect_whirligig.jpg	INS-008	Scavenger
9	Backswimmer	Notonecta	Ishing-lil	Swims upside down.	assets/insect_backswimmer.jpg	INS-009	Predator
10	Damselfly	Zygoptera	Tinthrok-macha	Slender relative of dragonfly.	assets/insect_damselfly.jpg	INS-010	Predator
11	Mosquito Larva	Culicidae	Kang-ma-ru	Food for many fish.	assets/insect_mosquito_larva.jpg	INS-011	Prey
12	Mayfly Nymph	Ephemeroptera	Kwak-ta	Sign of clean water.	assets/insect_mayfly.jpg	INS-012	Indicator
13	Caddisfly Larva	Trichoptera	U-aa	Builds protective case.	assets/insect_caddisfly.jpg	INS-013	Decomposer
14	Water Stick Insect	Ranatra	Ishing-che	Resembles a stick.	assets/insect_ranatra.jpg	INS-014	Predator
15	Stonefly Nymph	Plecoptera	Nung-pan	Found in flowing water.	assets/insect_stonefly.jpg	INS-015	Indicator
16	Dobsonfly Larva	Corydalinae	Sa-kor	Large mandibles.	assets/insect_dobsonfly.jpg	INS-016	Predator
17	Crane Fly	Tipulidae	Kang-go	Looks like giant mosquito.	assets/insect_cranefly.jpg	INS-017	Decomposer
18	Hoverfly	Syrphidae	Malem-tombi	Bee mimic.	assets/insect_hoverfly.jpg	INS-018	Pollinator
19	Honey Bee	Apis cerana	Khoi	Essential for wetland flowers.	assets/insect_honeybee.jpg	INS-019	Pollinator
20	Butterfly	Lepidoptera	Kurak-maba	Visits wetland margins.	assets/insect_butterfly.jpg	INS-020	Pollinator
\.


--
-- Data for Name: wetland_animals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wetland_animals (wetland_id, animal_id) FROM stdin;
8	1
1	2
2	2
8	2
11	2
11	3
13	3
1	4
12	4
17	4
18	4
3	5
4	5
13	5
14	5
15	5
16	5
18	5
19	5
1	6
6	6
8	6
9	6
10	6
11	6
16	6
18	6
4	7
6	7
16	7
20	7
1	8
3	8
6	8
14	8
18	8
2	9
5	9
9	9
10	9
14	9
16	9
19	9
20	9
2	10
5	10
5	11
6	11
10	11
12	11
13	11
20	11
13	12
14	12
16	12
19	12
20	12
1	13
8	13
10	13
11	13
1	14
2	14
3	14
9	14
14	14
2	15
8	15
9	15
11	15
14	15
17	15
1	16
3	16
14	16
17	16
19	16
5	17
8	17
10	17
13	17
16	17
18	17
1	18
2	18
8	18
14	18
15	18
17	18
19	18
2	19
6	19
12	19
13	19
14	19
17	19
19	19
2	20
14	20
16	20
2	21
7	21
17	21
\.


--
-- Data for Name: wetland_birds; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wetland_birds (wetland_id, bird_id) FROM stdin;
3	1
7	1
17	1
20	1
1	2
11	2
3	3
5	3
7	3
9	3
10	3
17	3
20	3
1	4
4	4
7	4
8	4
9	4
13	4
18	4
2	5
3	5
7	5
8	5
13	5
17	5
20	5
8	6
12	6
14	6
15	7
16	7
18	7
2	8
4	8
6	8
8	8
14	8
16	8
18	8
19	8
2	9
4	9
10	9
13	9
3	10
15	10
16	10
6	11
8	11
9	11
12	11
14	11
17	11
18	11
20	11
3	12
7	12
9	12
12	12
2	13
4	13
6	13
8	13
11	13
12	13
13	13
15	13
6	14
8	14
13	14
16	14
2	15
6	15
8	15
14	15
19	15
20	15
4	16
16	16
6	17
14	17
16	17
17	17
2	18
7	18
9	18
15	18
17	18
18	18
11	19
15	19
4	20
5	20
9	20
15	20
8	21
11	21
13	21
16	21
4	22
14	22
15	23
18	23
20	23
\.


--
-- Data for Name: wetland_fish; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wetland_fish (wetland_id, fish_id) FROM stdin;
1	1
6	2
7	2
8	2
12	2
13	2
19	2
9	3
15	3
17	3
18	3
2	4
3	4
14	4
1	5
2	5
4	5
5	5
17	5
18	5
20	5
8	6
9	6
4	7
7	7
12	7
16	7
8	8
9	8
10	8
13	8
18	8
20	8
6	9
9	9
10	9
20	9
1	10
2	10
12	10
13	10
14	10
7	11
8	11
9	11
12	11
13	11
14	11
16	11
6	12
10	12
4	13
6	13
9	13
10	13
14	13
18	13
20	13
3	14
5	14
17	14
1	15
4	15
10	15
16	15
3	16
9	16
10	16
11	16
18	16
5	17
7	17
13	17
14	17
19	17
20	17
5	18
9	18
11	18
13	18
16	18
17	18
10	19
12	19
16	19
17	19
19	19
1	20
16	20
\.


--
-- Data for Name: wetland_flora; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wetland_flora (wetland_id, flora_id) FROM stdin;
2	1
16	1
1	2
9	2
12	2
13	2
15	2
3	3
5	3
6	3
10	3
11	3
17	3
19	3
20	3
2	4
4	4
6	4
9	4
3	5
4	5
5	5
7	5
8	5
10	5
14	5
20	5
5	6
9	6
10	6
11	6
13	6
16	6
17	6
1	7
3	7
4	7
9	7
20	7
5	8
6	8
8	8
9	8
14	8
17	8
19	8
1	9
5	9
8	9
13	9
16	9
17	9
1	10
3	10
6	10
7	10
10	10
17	10
18	10
19	10
9	11
14	11
20	11
2	12
4	12
6	12
7	12
15	12
3	13
9	13
4	14
7	14
10	14
18	14
7	15
9	15
18	15
1	16
4	16
7	16
10	16
16	16
1	17
9	17
13	17
18	17
10	18
13	18
16	18
3	19
7	19
8	19
14	19
16	19
2	20
6	20
7	20
9	20
12	20
16	20
17	20
19	20
\.


--
-- Data for Name: wetland_insects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wetland_insects (wetland_id, insect_id) FROM stdin;
1	1
8	1
9	1
13	1
15	1
17	1
3	2
5	2
7	2
8	2
9	2
14	2
15	2
17	2
1	3
8	3
10	3
13	3
14	3
16	3
19	3
2	4
5	4
12	4
14	4
6	5
10	5
14	5
16	5
2	6
6	6
9	7
13	7
14	7
16	7
4	8
5	8
6	8
15	8
19	8
4	9
5	9
7	9
14	9
17	9
19	9
5	10
8	10
10	10
13	10
15	10
16	10
19	10
5	11
10	11
13	11
17	11
20	11
4	12
17	12
18	12
19	12
4	13
6	13
7	13
14	13
16	13
18	13
20	13
11	14
12	14
14	14
16	14
20	14
1	15
10	15
11	15
12	15
13	15
14	15
17	15
19	15
2	16
3	16
4	16
12	16
16	16
17	16
2	17
4	17
11	17
12	17
13	17
15	17
17	17
20	17
1	18
2	18
12	18
14	18
15	18
17	18
19	18
2	19
4	19
9	19
10	19
14	19
20	19
1	20
2	20
6	20
8	20
12	20
15	20
17	20
\.


--
-- Data for Name: wetlands; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.wetlands (id, name, type, district, latitude, longitude, description, image_url, common_id, area_sq_km) FROM stdin;
1	Loktak Lake	Floodplain Lake	Bishnupur	24.556800	93.820000	Largest freshwater lake in NE India, famous for Phumdis.	assets/wetland_loktak.jpg	WL-001	287.00
2	Pumlen Pat	Lake	Kakching	24.380000	93.900000	Second largest lake, threatened by encroachment.	assets/wetland_pumlen.jpg	WL-002	19.00
3	Ikop Pat	Wetland	Thoubal	24.530000	93.950000	Ecologically connected to Kharung Pat.	assets/wetland_ikop.jpg	WL-003	13.50
4	Waithou Pat	Marsh	Thoubal	24.680000	93.980000	Famous for pineapple cultivation on surrounding hills.	assets/wetland_waithou.jpg	WL-004	10.00
5	Kharung Pat	Shallow Clay Wetland	Thoubal	24.560000	93.970000	Important for local irrigation and fishing.	assets/wetland_kharung.jpg	WL-005	5.00
6	Lousi Pat	Wetland	Kakching	24.400000	93.920000	Facing drainage issues due to developmental projects.	assets/wetland_lousi.jpg	WL-006	18.00
7	Khoidum Pat	Wetland	Imphal West	24.600000	93.850000	Adjacent to Loktak, supports distinct waterfowl.	assets/wetland_khoidum.jpg	WL-007	3.00
8	Keibul Lamjao	National Park	Bishnupur	24.450000	93.830000	World's only floating national park, home of the Sangai.	assets/wetland_keibul.jpg	WL-008	40.00
9	Sanapat	Lake	Bishnupur	24.483300	93.800000	Crucial fishery resource connected to Loktak.	assets/wetland_sanapat.jpg	WL-009	6.50
10	Utra Pat	Marsh	Bishnupur	24.566700	93.833300	Recently notified under Wetland Rules.	assets/wetland_utra.jpg	WL-010	2.00
11	Thanga Pat	Lake Margin	Bishnupur	24.500000	93.800000	Surrounds the Thanga hill island.	assets/wetland_thanga.jpg	WL-011	1.50
12	Ungamel Pat	Lake	Bishnupur	24.533300	93.883300	Rich in aquatic bio-resources.	assets/wetland_ungamel.jpg	WL-012	4.50
13	Lamphelpat	Urban Wetland	Imphal West	24.817000	93.936000	Strategic urban reservoir; heavily encroached.	assets/wetland_lamphel.jpg	WL-013	8.00
14	Yaral Pat	Marsh	Imphal East	24.783300	94.016700	Famous for 'Kombirei' (Iris) flowers.	assets/wetland_yaral.jpg	WL-014	3.20
15	Poirou Pat	Pond	Imphal East	24.733300	93.983300	Community fishing ground.	assets/wetland_poirou.jpg	WL-015	6.00
16	Heingang Pat	Marsh	Imphal East	24.850000	93.950000	Located at the foot of Heingang hills.	assets/wetland_heingang.jpg	WL-016	2.50
17	Akampat	Marsh	Imphal East	24.780000	93.960000	Seasonal wetland.	assets/wetland_akampat.jpg	WL-017	2.00
18	Porompat	Marsh	Imphal East	24.800000	93.950000	Partially reclaimed urban wetland.	assets/wetland_porompat.jpg	WL-018	1.50
19	Zaimeng Lake	Highland Lake	Kangpokpi	25.183300	93.883300	Rare high-altitude wetland; 'Lake of the puzzling tribes'.	assets/wetland_zaimeng.jpg	WL-019	0.80
20	Khamlang Pat	Lake	Kakching	24.350000	93.950000	Rural wetland supporting agriculture.	assets/wetland_khamlang.jpg	WL-020	4.20
\.


--
-- Name: animals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.animals_id_seq', 21, true);


--
-- Name: birds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.birds_id_seq', 23, true);


--
-- Name: fish_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.fish_id_seq', 20, true);


--
-- Name: flora_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.flora_id_seq', 20, true);


--
-- Name: insects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.insects_id_seq', 20, true);


--
-- Name: wetlands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.wetlands_id_seq', 20, true);


--
-- Name: animals animals_common_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_common_id_key UNIQUE (common_id);


--
-- Name: animals animals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_pkey PRIMARY KEY (id);


--
-- Name: birds birds_common_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.birds
    ADD CONSTRAINT birds_common_id_key UNIQUE (common_id);


--
-- Name: birds birds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.birds
    ADD CONSTRAINT birds_pkey PRIMARY KEY (id);


--
-- Name: fish fish_common_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fish
    ADD CONSTRAINT fish_common_id_key UNIQUE (common_id);


--
-- Name: fish fish_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fish
    ADD CONSTRAINT fish_pkey PRIMARY KEY (id);


--
-- Name: flora flora_common_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flora
    ADD CONSTRAINT flora_common_id_key UNIQUE (common_id);


--
-- Name: flora flora_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flora
    ADD CONSTRAINT flora_pkey PRIMARY KEY (id);


--
-- Name: insects insects_common_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.insects
    ADD CONSTRAINT insects_common_id_key UNIQUE (common_id);


--
-- Name: insects insects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.insects
    ADD CONSTRAINT insects_pkey PRIMARY KEY (id);


--
-- Name: wetland_animals wetland_animals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_animals
    ADD CONSTRAINT wetland_animals_pkey PRIMARY KEY (wetland_id, animal_id);


--
-- Name: wetland_birds wetland_birds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_birds
    ADD CONSTRAINT wetland_birds_pkey PRIMARY KEY (wetland_id, bird_id);


--
-- Name: wetland_fish wetland_fish_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_fish
    ADD CONSTRAINT wetland_fish_pkey PRIMARY KEY (wetland_id, fish_id);


--
-- Name: wetland_flora wetland_flora_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_flora
    ADD CONSTRAINT wetland_flora_pkey PRIMARY KEY (wetland_id, flora_id);


--
-- Name: wetland_insects wetland_insects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_insects
    ADD CONSTRAINT wetland_insects_pkey PRIMARY KEY (wetland_id, insect_id);


--
-- Name: wetlands wetlands_common_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetlands
    ADD CONSTRAINT wetlands_common_id_key UNIQUE (common_id);


--
-- Name: wetlands wetlands_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetlands
    ADD CONSTRAINT wetlands_pkey PRIMARY KEY (id);


--
-- Name: wetland_animals fk_wa_animal; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_animals
    ADD CONSTRAINT fk_wa_animal FOREIGN KEY (animal_id) REFERENCES public.animals(id) ON DELETE CASCADE;


--
-- Name: wetland_animals fk_wa_wetland; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_animals
    ADD CONSTRAINT fk_wa_wetland FOREIGN KEY (wetland_id) REFERENCES public.wetlands(id) ON DELETE CASCADE;


--
-- Name: wetland_birds fk_wb_bird; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_birds
    ADD CONSTRAINT fk_wb_bird FOREIGN KEY (bird_id) REFERENCES public.birds(id) ON DELETE CASCADE;


--
-- Name: wetland_birds fk_wb_wetland; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_birds
    ADD CONSTRAINT fk_wb_wetland FOREIGN KEY (wetland_id) REFERENCES public.wetlands(id) ON DELETE CASCADE;


--
-- Name: wetland_fish fk_wf_fish; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_fish
    ADD CONSTRAINT fk_wf_fish FOREIGN KEY (fish_id) REFERENCES public.fish(id) ON DELETE CASCADE;


--
-- Name: wetland_fish fk_wf_wetland; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_fish
    ADD CONSTRAINT fk_wf_wetland FOREIGN KEY (wetland_id) REFERENCES public.wetlands(id) ON DELETE CASCADE;


--
-- Name: wetland_flora fk_wfl_flora; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_flora
    ADD CONSTRAINT fk_wfl_flora FOREIGN KEY (flora_id) REFERENCES public.flora(id) ON DELETE CASCADE;


--
-- Name: wetland_flora fk_wfl_wetland; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_flora
    ADD CONSTRAINT fk_wfl_wetland FOREIGN KEY (wetland_id) REFERENCES public.wetlands(id) ON DELETE CASCADE;


--
-- Name: wetland_insects fk_wi_insect; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_insects
    ADD CONSTRAINT fk_wi_insect FOREIGN KEY (insect_id) REFERENCES public.insects(id) ON DELETE CASCADE;


--
-- Name: wetland_insects fk_wi_wetland; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wetland_insects
    ADD CONSTRAINT fk_wi_wetland FOREIGN KEY (wetland_id) REFERENCES public.wetlands(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 7HqlWDiIcyN36ddtPAfT6BbujFa3Acs8l7LkUAwmK7FIf0j8gT2XS6QSpuFeIGu

