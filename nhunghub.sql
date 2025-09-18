--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-09-18 16:23:26

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

--
-- TOC entry 4911 (class 0 OID 24910)
-- Dependencies: 222
-- Data for Name: Admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admins" (id, name, password, "createdAt", "updatedAt") FROM stdin;
1	nhunghubadmin	loadingmovie66	2025-09-18 15:56:23.333+07	2025-09-18 15:56:23.333+07
2	nhunghubadmin	nhunghub6789	2025-09-18 15:59:42.753+07	2025-09-18 15:59:42.753+07
\.


--
-- TOC entry 4909 (class 0 OID 24901)
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
11	Inception	inception.jpg	5	A thief steals corporate secrets through dream-sharing technology.	{Sci-Fi,Action}	{"Amazing movie!","Mind-blowing visuals!"}	2025-09-18 15:23:37.007+07	2025-09-18 15:23:37.007+07
\.


--
-- TOC entry 4907 (class 0 OID 24883)
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
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 221
-- Name: Admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admins_id_seq"', 2, true);


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 219
-- Name: Movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movies_id_seq"', 11, true);


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 217
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 10, true);


-- Completed on 2025-09-18 16:23:26

--
-- PostgreSQL database dump complete
--

