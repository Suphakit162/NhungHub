--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-09-14 11:19:50

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 24901)
-- Name: Movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movies" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    rating integer NOT NULL,
    description text,
    genre character varying(255)[],
    review text[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Movies" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24900)
-- Name: Movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Movies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Movies_id_seq" OWNER TO postgres;

--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 219
-- Name: Movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Movies_id_seq" OWNED BY public."Movies".id;


--
-- TOC entry 218 (class 1259 OID 24883)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24882)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 217
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 4748 (class 2604 OID 24904)
-- Name: Movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies" ALTER COLUMN id SET DEFAULT nextval('public."Movies_id_seq"'::regclass);


--
-- TOC entry 4747 (class 2604 OID 24886)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 4901 (class 0 OID 24901)
-- Dependencies: 220
-- Data for Name: Movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movies" (id, name, image, rating, description, genre, review, "createdAt", "updatedAt") FROM stdin;
1	Inception	inception.jpg	5	A thief steals corporate secrets through dream-sharing technology.	{Sci-Fi,Action}	{"Amazing movie!","Mind-blowing visuals!"}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
2	The Godfather	godfather.jpg	5	The aging patriarch of an organized crime dynasty transfers control to his reluctant son.	{Crime,Drama}	{Masterpiece.,"Classic mafia story."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
3	Titanic	titanic.jpg	4	A love story unfolds on the ill-fated Titanic ship.	{Romance,Drama}	{Heartbreaking!,"Beautiful visuals."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
4	Avengers: Endgame	endgame.jpg	5	Superheroes unite to undo the damage caused by Thanos.	{Action,Adventure,Sci-Fi}	{"Epic finale!","Loved every moment."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
5	Joker	joker.jpg	4	A failed comedian descends into madness in Gotham City.	{Crime,Drama,Thriller}	{"Outstanding performance.","Dark and gripping."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
6	Frozen	frozen.jpg	4	A princess sets out to find her sister with magical ice powers.	{Animation,Family,Adventure}	{"Fun for kids.","Catchy songs!"}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
7	Interstellar	interstellar.jpg	5	Astronauts travel through a wormhole to save humanity.	{Sci-Fi,Drama,Adventure}	{Mind-expanding!,"Visually stunning."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
8	Parasite	parasite.jpg	5	A poor family schemes to infiltrate a wealthy household.	{Thriller,Drama}	{"Brilliant plot.","Clever social commentary."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
9	The Lion King	lionking.jpg	5	A young lion prince flees his kingdom only to learn the true meaning of responsibility.	{Animation,Adventure,Family}	{"Timeless classic.","Loved the songs."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
10	Spider-Man: No Way Home	spiderman.jpg	5	Spider-Man faces multiverse villains while trying to protect his identity.	{Action,Adventure,Sci-Fi}	{"Fan service done right.","Exciting and emotional."}	2025-09-14 11:15:51.47+07	2025-09-14 11:15:51.47+07
\.


--
-- TOC entry 4899 (class 0 OID 24883)
-- Dependencies: 218
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, email, password, "createdAt", "updatedAt") FROM stdin;
1	alice	alice@example.com	passAlice1	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
2	bob	bob@example.com	passBob2	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
3	charlie	charlie@example.com	passCharlie3	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
4	david	david@example.com	passDavid4	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
5	eva	eva@example.com	passEva5	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
6	frank	frank@example.com	passFrank6	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
7	grace	grace@example.com	passGrace7	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
8	henry	henry@example.com	passHenry8	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
9	irene	irene@example.com	passIrene9	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
10	jack	jack@example.com	passJack10	2025-09-14 09:41:24.908+07	2025-09-14 09:41:24.908+07
\.


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 219
-- Name: Movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movies_id_seq"', 10, true);


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 217
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 10, true);


--
-- TOC entry 4752 (class 2606 OID 24908)
-- Name: Movies Movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_pkey" PRIMARY KEY (id);


--
-- TOC entry 4750 (class 2606 OID 24890)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


-- Completed on 2025-09-14 11:19:50

--
-- PostgreSQL database dump complete
--

