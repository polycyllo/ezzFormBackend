PGDMP  7    1    	        
    |            ezzForm    16.4    16.4 6    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24800    ezzForm    DATABASE     ~   CREATE DATABASE "ezzForm" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Bolivia.1252';
    DROP DATABASE "ezzForm";
                postgres    false            �            1259    24809 
   formulario    TABLE       CREATE TABLE public.formulario (
    codformulario integer NOT NULL,
    codusuario integer,
    nombreformulario character varying(100),
    descripcion character varying(500),
    activo boolean,
    "createdAt" time without time zone,
    "updatedAt" time without time zone
);
    DROP TABLE public.formulario;
       public         heap    postgres    false            �            1259    24808    formulario_codformulario_seq    SEQUENCE     �   CREATE SEQUENCE public.formulario_codformulario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.formulario_codformulario_seq;
       public          postgres    false    218            �           0    0    formulario_codformulario_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.formulario_codformulario_seq OWNED BY public.formulario.codformulario;
          public          postgres    false    217            �            1259    24823    formulariorespondido    TABLE     �   CREATE TABLE public.formulariorespondido (
    codformulariorespondido integer NOT NULL,
    codusuario integer,
    codformulario integer,
    fecharespuesta date
);
 (   DROP TABLE public.formulariorespondido;
       public         heap    postgres    false            �            1259    24822 0   formulariorespondido_codformulariorespondido_seq    SEQUENCE     �   CREATE SEQUENCE public.formulariorespondido_codformulariorespondido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 G   DROP SEQUENCE public.formulariorespondido_codformulariorespondido_seq;
       public          postgres    false    220            �           0    0 0   formulariorespondido_codformulariorespondido_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.formulariorespondido_codformulariorespondido_seq OWNED BY public.formulariorespondido.codformulariorespondido;
          public          postgres    false    219            �            1259    24852    opcion    TABLE     �   CREATE TABLE public.opcion (
    codrespuesta integer NOT NULL,
    codpregunta integer,
    textoopcion character varying(300),
    esrespuesta boolean
);
    DROP TABLE public.opcion;
       public         heap    postgres    false            �            1259    24851    opcion_idrespuesta_seq    SEQUENCE     �   CREATE SEQUENCE public.opcion_idrespuesta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.opcion_idrespuesta_seq;
       public          postgres    false    224            �           0    0    opcion_idrespuesta_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.opcion_idrespuesta_seq OWNED BY public.opcion.codrespuesta;
          public          postgres    false    223            �            1259    24840    pregunta    TABLE     �   CREATE TABLE public.pregunta (
    codpregunta integer NOT NULL,
    codformulario integer,
    pregunta character varying(100),
    tipopregunta character varying(30)
);
    DROP TABLE public.pregunta;
       public         heap    postgres    false            �            1259    24839    pregunta_codpregunta_seq    SEQUENCE     �   CREATE SEQUENCE public.pregunta_codpregunta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.pregunta_codpregunta_seq;
       public          postgres    false    222            �           0    0    pregunta_codpregunta_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.pregunta_codpregunta_seq OWNED BY public.pregunta.codpregunta;
          public          postgres    false    221            �            1259    24864    respuestausuario    TABLE     �   CREATE TABLE public.respuestausuario (
    codrespuesta integer NOT NULL,
    codpregunta integer,
    idrespuesta integer,
    codformulariorespondido integer,
    respuestatexto character varying(300)
);
 $   DROP TABLE public.respuestausuario;
       public         heap    postgres    false            �            1259    24863 !   respuestausuario_codrespuesta_seq    SEQUENCE     �   CREATE SEQUENCE public.respuestausuario_codrespuesta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.respuestausuario_codrespuesta_seq;
       public          postgres    false    226            �           0    0 !   respuestausuario_codrespuesta_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.respuestausuario_codrespuesta_seq OWNED BY public.respuestausuario.codrespuesta;
          public          postgres    false    225            �            1259    24802    usuario    TABLE     �   CREATE TABLE public.usuario (
    codusuario integer NOT NULL,
    nombre character varying(30),
    apellido character varying(30),
    correoelectronico character varying(40),
    fechadecreaciondecuenta date,
    contrasenia character varying(100)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    24801    usuario_codusuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_codusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_codusuario_seq;
       public          postgres    false    216            �           0    0    usuario_codusuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_codusuario_seq OWNED BY public.usuario.codusuario;
          public          postgres    false    215            4           2604    24812    formulario codformulario    DEFAULT     �   ALTER TABLE ONLY public.formulario ALTER COLUMN codformulario SET DEFAULT nextval('public.formulario_codformulario_seq'::regclass);
 G   ALTER TABLE public.formulario ALTER COLUMN codformulario DROP DEFAULT;
       public          postgres    false    217    218    218            5           2604    24826 ,   formulariorespondido codformulariorespondido    DEFAULT     �   ALTER TABLE ONLY public.formulariorespondido ALTER COLUMN codformulariorespondido SET DEFAULT nextval('public.formulariorespondido_codformulariorespondido_seq'::regclass);
 [   ALTER TABLE public.formulariorespondido ALTER COLUMN codformulariorespondido DROP DEFAULT;
       public          postgres    false    220    219    220            7           2604    24855    opcion codrespuesta    DEFAULT     y   ALTER TABLE ONLY public.opcion ALTER COLUMN codrespuesta SET DEFAULT nextval('public.opcion_idrespuesta_seq'::regclass);
 B   ALTER TABLE public.opcion ALTER COLUMN codrespuesta DROP DEFAULT;
       public          postgres    false    224    223    224            6           2604    24843    pregunta codpregunta    DEFAULT     |   ALTER TABLE ONLY public.pregunta ALTER COLUMN codpregunta SET DEFAULT nextval('public.pregunta_codpregunta_seq'::regclass);
 C   ALTER TABLE public.pregunta ALTER COLUMN codpregunta DROP DEFAULT;
       public          postgres    false    222    221    222            8           2604    24867    respuestausuario codrespuesta    DEFAULT     �   ALTER TABLE ONLY public.respuestausuario ALTER COLUMN codrespuesta SET DEFAULT nextval('public.respuestausuario_codrespuesta_seq'::regclass);
 L   ALTER TABLE public.respuestausuario ALTER COLUMN codrespuesta DROP DEFAULT;
       public          postgres    false    226    225    226            3           2604    24805    usuario codusuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN codusuario SET DEFAULT nextval('public.usuario_codusuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN codusuario DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    24809 
   formulario 
   TABLE DATA           �   COPY public.formulario (codformulario, codusuario, nombreformulario, descripcion, activo, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   �E       �          0    24823    formulariorespondido 
   TABLE DATA           r   COPY public.formulariorespondido (codformulariorespondido, codusuario, codformulario, fecharespuesta) FROM stdin;
    public          postgres    false    220   �E       �          0    24852    opcion 
   TABLE DATA           U   COPY public.opcion (codrespuesta, codpregunta, textoopcion, esrespuesta) FROM stdin;
    public          postgres    false    224   F       �          0    24840    pregunta 
   TABLE DATA           V   COPY public.pregunta (codpregunta, codformulario, pregunta, tipopregunta) FROM stdin;
    public          postgres    false    222   %F       �          0    24864    respuestausuario 
   TABLE DATA           {   COPY public.respuestausuario (codrespuesta, codpregunta, idrespuesta, codformulariorespondido, respuestatexto) FROM stdin;
    public          postgres    false    226   BF       �          0    24802    usuario 
   TABLE DATA           x   COPY public.usuario (codusuario, nombre, apellido, correoelectronico, fechadecreaciondecuenta, contrasenia) FROM stdin;
    public          postgres    false    216   _F       �           0    0    formulario_codformulario_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.formulario_codformulario_seq', 337, true);
          public          postgres    false    217            �           0    0 0   formulariorespondido_codformulariorespondido_seq    SEQUENCE SET     _   SELECT pg_catalog.setval('public.formulariorespondido_codformulariorespondido_seq', 1, false);
          public          postgres    false    219            �           0    0    opcion_idrespuesta_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.opcion_idrespuesta_seq', 430, true);
          public          postgres    false    223            �           0    0    pregunta_codpregunta_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.pregunta_codpregunta_seq', 281, true);
          public          postgres    false    221            �           0    0 !   respuestausuario_codrespuesta_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.respuestausuario_codrespuesta_seq', 1, false);
          public          postgres    false    225            �           0    0    usuario_codusuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_codusuario_seq', 6, true);
          public          postgres    false    215            <           2606    24816    formulario formulario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.formulario
    ADD CONSTRAINT formulario_pkey PRIMARY KEY (codformulario);
 D   ALTER TABLE ONLY public.formulario DROP CONSTRAINT formulario_pkey;
       public            postgres    false    218            >           2606    24828 .   formulariorespondido formulariorespondido_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.formulariorespondido
    ADD CONSTRAINT formulariorespondido_pkey PRIMARY KEY (codformulariorespondido);
 X   ALTER TABLE ONLY public.formulariorespondido DROP CONSTRAINT formulariorespondido_pkey;
       public            postgres    false    220            B           2606    24857    opcion opcion_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.opcion
    ADD CONSTRAINT opcion_pkey PRIMARY KEY (codrespuesta);
 <   ALTER TABLE ONLY public.opcion DROP CONSTRAINT opcion_pkey;
       public            postgres    false    224            @           2606    24845    pregunta pregunta_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.pregunta
    ADD CONSTRAINT pregunta_pkey PRIMARY KEY (codpregunta);
 @   ALTER TABLE ONLY public.pregunta DROP CONSTRAINT pregunta_pkey;
       public            postgres    false    222            D           2606    24869 &   respuestausuario respuestausuario_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.respuestausuario
    ADD CONSTRAINT respuestausuario_pkey PRIMARY KEY (codrespuesta);
 P   ALTER TABLE ONLY public.respuestausuario DROP CONSTRAINT respuestausuario_pkey;
       public            postgres    false    226            :           2606    24807    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (codusuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    216            E           2606    24817     formulario fk_formulario_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.formulario
    ADD CONSTRAINT fk_formulario_usuario FOREIGN KEY (codusuario) REFERENCES public.usuario(codusuario) ON UPDATE RESTRICT ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public.formulario DROP CONSTRAINT fk_formulario_usuario;
       public          postgres    false    4666    218    216            F           2606    24834 7   formulariorespondido fk_formulariorespondido_formulario    FK CONSTRAINT     �   ALTER TABLE ONLY public.formulariorespondido
    ADD CONSTRAINT fk_formulariorespondido_formulario FOREIGN KEY (codformulario) REFERENCES public.formulario(codformulario) ON UPDATE RESTRICT ON DELETE RESTRICT;
 a   ALTER TABLE ONLY public.formulariorespondido DROP CONSTRAINT fk_formulariorespondido_formulario;
       public          postgres    false    4668    218    220            G           2606    24829 4   formulariorespondido fk_formulariorespondido_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.formulariorespondido
    ADD CONSTRAINT fk_formulariorespondido_usuario FOREIGN KEY (codusuario) REFERENCES public.usuario(codusuario) ON UPDATE RESTRICT ON DELETE RESTRICT;
 ^   ALTER TABLE ONLY public.formulariorespondido DROP CONSTRAINT fk_formulariorespondido_usuario;
       public          postgres    false    220    4666    216            I           2606    24858    opcion fk_opcion_pregunta    FK CONSTRAINT     �   ALTER TABLE ONLY public.opcion
    ADD CONSTRAINT fk_opcion_pregunta FOREIGN KEY (codpregunta) REFERENCES public.pregunta(codpregunta) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.opcion DROP CONSTRAINT fk_opcion_pregunta;
       public          postgres    false    224    222    4672            H           2606    24846    pregunta fk_pregunta_formulario    FK CONSTRAINT     �   ALTER TABLE ONLY public.pregunta
    ADD CONSTRAINT fk_pregunta_formulario FOREIGN KEY (codformulario) REFERENCES public.formulario(codformulario) ON UPDATE RESTRICT ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.pregunta DROP CONSTRAINT fk_pregunta_formulario;
       public          postgres    false    222    4668    218            J           2606    24870 3   respuestausuario fk_respuestausuario_formrespondido    FK CONSTRAINT     �   ALTER TABLE ONLY public.respuestausuario
    ADD CONSTRAINT fk_respuestausuario_formrespondido FOREIGN KEY (codformulariorespondido) REFERENCES public.formulariorespondido(codformulariorespondido) ON UPDATE RESTRICT ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public.respuestausuario DROP CONSTRAINT fk_respuestausuario_formrespondido;
       public          postgres    false    4670    226    220            K           2606    24880 +   respuestausuario fk_respuestausuario_opcion    FK CONSTRAINT     �   ALTER TABLE ONLY public.respuestausuario
    ADD CONSTRAINT fk_respuestausuario_opcion FOREIGN KEY (idrespuesta) REFERENCES public.opcion(codrespuesta) ON UPDATE RESTRICT ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.respuestausuario DROP CONSTRAINT fk_respuestausuario_opcion;
       public          postgres    false    224    4674    226            L           2606    24875 -   respuestausuario fk_respuestausuario_pregunta    FK CONSTRAINT     �   ALTER TABLE ONLY public.respuestausuario
    ADD CONSTRAINT fk_respuestausuario_pregunta FOREIGN KEY (codpregunta) REFERENCES public.pregunta(codpregunta) ON UPDATE RESTRICT ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public.respuestausuario DROP CONSTRAINT fk_respuestausuario_pregunta;
       public          postgres    false    4672    222    226            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   V   x�3�,-.M,��w�L�� .#��gBԘ�(?)��$�35'3�������D��P�Ȁ����)gVibgAjA*��.�=... ��&�     