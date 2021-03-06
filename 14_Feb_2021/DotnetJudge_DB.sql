PGDMP     7                    y         	   defaultdb    12.5    13.1     R           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            S           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            T           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            U           1262    16395 	   defaultdb    DATABASE     ^   CREATE DATABASE defaultdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE defaultdb;
                doadmin    false            �            1259    16439    Applications    TABLE     
  CREATE TABLE public."Applications" (
    "Id" integer NOT NULL,
    "ApplicationId" character varying(128) NOT NULL,
    "PasswordHash" character varying(512) NOT NULL,
    "IPv4" character varying(16),
    "IgnoreIPv4Verification" boolean DEFAULT false NOT NULL
);
 "   DROP TABLE public."Applications";
       public         heap    doadmin    false            �            1259    16437    Applications_Id_seq    SEQUENCE     �   ALTER TABLE public."Applications" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Applications_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          doadmin    false    205            �            1259    16398    Quizes    TABLE     �  CREATE TABLE public."Quizes" (
    "Id" integer NOT NULL,
    "Number" integer NOT NULL,
    "CallMethodName" character varying(128) NOT NULL,
    "InputType" character varying(32) NOT NULL,
    "OutputType" character varying(32) NOT NULL,
    "InputData" text NOT NULL,
    "ExpectedOutputs" text NOT NULL,
    "Name" text NOT NULL,
    "DescriptionHtml" text,
    "SamplesHtml" text,
    "InitialFunctionCode" text,
    "JsCheckingFunction" text,
    "Level" "char" DEFAULT 'L'::"char" NOT NULL
);
    DROP TABLE public."Quizes";
       public         heap    doadmin    false            �            1259    16396    Quizes_Id_seq    SEQUENCE     �   ALTER TABLE public."Quizes" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Quizes_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          doadmin    false    203            O          0    16439    Applications 
   TABLE DATA           q   COPY public."Applications" ("Id", "ApplicationId", "PasswordHash", "IPv4", "IgnoreIPv4Verification") FROM stdin;
    public          doadmin    false    205   �       M          0    16398    Quizes 
   TABLE DATA           �   COPY public."Quizes" ("Id", "Number", "CallMethodName", "InputType", "OutputType", "InputData", "ExpectedOutputs", "Name", "DescriptionHtml", "SamplesHtml", "InitialFunctionCode", "JsCheckingFunction", "Level") FROM stdin;
    public          doadmin    false    203   �       V           0    0    Applications_Id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Applications_Id_seq"', 3, true);
          public          doadmin    false    204            W           0    0    Quizes_Id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Quizes_Id_seq"', 15, true);
          public          doadmin    false    202            �           2606    16446    Applications Applications_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Applications"
    ADD CONSTRAINT "Applications_pkey" PRIMARY KEY ("Id");
 L   ALTER TABLE ONLY public."Applications" DROP CONSTRAINT "Applications_pkey";
       public            doadmin    false    205            �           2606    16405    Quizes Quizes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Quizes"
    ADD CONSTRAINT "Quizes_pkey" PRIMARY KEY ("Id");
 @   ALTER TABLE ONLY public."Quizes" DROP CONSTRAINT "Quizes_pkey";
       public            doadmin    false    203            O   �   x�%αN1����W[{���C��@��Y�k	r(	<?F�G���{9�~�����Ί�ȈÎ]�hc�11� ����*�P�9%��N'��E���mק��qyX]zA�,��դ0[�&#E�V��*sj%�y���z<�x�7�g������x��:����j��Y T�ѦR��sr�#8H�(�1w����mv�@~      M      x��\{o�8����D�{c��k�v�d�Ң�f��n:w�\�d���ȒG�:� �}σ�(ENk�)Rے�C�<~<琔�8l�C.��dƍ8����I#�+1��׵�]�޳�~�������P�9�}�3j�=��%�R�������~�@�����D����0��8�E8��}�S�o�w~G/��RX�A"\��Gb2w#w��(I(fa� �@'�.�0�E,/2H:�0��],}i	/��X��:�����=��Ã�ؐ����K���$nw�42��i��?����ZLC�	T�H���i�L�c����3bU��k�d�N�D^�H��G)���/d��䟩�)rf,�%<e���{,Kuw�%^�}.V,�*�����Q�������x��k��U�BW�M�X��б��r��5e$^��A�����D.~)^v���|��Y��.�}9I<��=�:d #o�6�LǾ7ߍc�-
/#wqܜ���q�&�� Lɳ@�6�d�+�z���K���K$�m*�\F��᧷��m��K��A�
��n"���_�*�-y��C��a��?`M��V�]q�h�*àb�L8n|�|w.�n�颈-T>?\�h��R�.}/�_&�is7�mH���@n���������ďCK+|�C ,�����
 �t1���jN��1*>�yQ�� ���S	��@���B�N%�|�'�����#^�}w<q'l�\�]���cUj%ْ�0/F�@��Ǟe�
�e�l�5��;�H_��IE2�H��j6e����k{������X�q��(I�z���L����]~����'��9��Ģ�Y0�4�ҩ�x�<��!Ĉ"5sx@)��ۧgv�n�-}/�~G�s��l��u���4
���ğ����ܱ%t]�uaVE��?f���9J�)ݽ�Ěk]d�i�q���悆�LT ��b��HWW��@
G�0���1�J8��W$�dZx1I8�Pq��іj���@�0����,}w��96����$um�_췪],�?q�U���ZwǾ�pQ=P�N��H^I�
7�H�y�r���Rf����y�2�=NjX㯐!S�!�;�3�/>��L���l�O�-FŢU�/�(2�|Td��A6�7j uݵO�^5��w�B��`���c��|7w�K���~�%a�0k�M�X�̹B�VPkVa4��2+)L�-�Pc���.��j��p�W�(\�(�@q��1���@O'����LFra �Fb��Ǎ�E5Wr:9�R�^���͙��aԢ(ŝ̵���I��z�9O+�:�.�ʁA?#�q���T��[e�HO%�]@�RrR2�ǵ�R���{�����<��-�w�Ӷ�" ��t�����U�)>F��n*@0�H5�]��_r8��4�K[���9�X�C�}K�C%��O�3D�/����iw��nկ��c8zS��R��Xt�J¥m��%z��[����z�B��Z� �ƀ�é0Ge�{���,�q��]�j�('&usE�F�2?]?���)s8���%�MT�V
�#��l&)����#���T�� A�F�:��	�l�:�-��R�cE�
#);?���a^��PEr�OP��{j@<1^"t�n�i�ৣ��p����I���N����K�8swQ ��DHH� 4`�8�r���mͭ�ȫ����v^k�{�m��3=-� [j�+e���ݒeG����|�.��������^0�,�͔o�1s�=r�CL��*dO%�mGP����mg`qt,TW�E��PH���蚞��G]�~ZJ�H�h]IL��L6�@7�8��9TIh}���&�Hs�`�]z������"3��o����"O �� ��j����	���II��N[������J�걝Jͬ�]���N�*�R�
Ă��^�hO�M�.��M�9�����(����Gʘ����4ףdl ޱN��XX(Ğ�Ayt�ZW��j�B <!�S\�R����n8�o8�w!���s8m��q�������i�����^:��?rؙ����O�{�^��yD�ܰ���`w��0����X�=p�)� CI}r���X4�Tk��	�S���U�vJםN0���I�Y�����V1fT�m`� &p2�>F�9���/[�#ᖛM(d�H�?�Ͼ��ؼ��RВ��u$��m��atwB�^���?{�ﯳ���e����G�|�؀��S��	��Si�A?�Tz��B�	��0�7��0h��2Y�n3@�����^�{J���l&�9�y�#9-cd����'�ݳ0Z��T��
�)���Q���9��s�� �hҗ��hfOaN���> ��(�b��6�ZG�.�(.e#P}��\��)o��y����d>|=_B�����zk���{��y���]s�$�4��"K�*>�R>c�x��*^��z�8�N�?�q"�.7�*�6��U��pɠ�������*�Q=$�W��1T��N��TO�J��O9|۩�+�<�s���A= 5xZsB���I?>;l���$����M�q�'�T$z_n7 {1���]���	==��VHd�Q��ܯO^�@|�6����rLt����q��_��K���`3�gHlPcw��a��M�Z����n�Jר��Q�cM���v1	��T@�M
\����J,d��s��\L���d��D6����懩�|0��» zoX� �Ҿ����$���'%m�����x)��n��	�\��As<0'*C�D"^�����
 D!J\3��1��=/3"�/��<�.H،P�l_e���%Ki�-x=L��J 6�'Era,q1�:����8�
�$w�SPs�W̾!N�:90�5a0
kfX�+�ɳR5�� ��.<�&ie���рNa�_�؞� C� x�8z����3���TĆ�6��(���"��X�Z���B�*y#�ͅzLK,E{"'��-����=!�ڶ�D�sB"��<�]�
+o����
�l0�����-�i�%���S����bǵ�A�~�{C��:�x���Iop��@����"��&:�p��1\��U�~�ثʓ�%hێ�C�Y�:��~��+�����>�ȩ\�Q]�.�q]�UY�b���j��VYu��Q/�B��꘲Ÿ�)C�/!��m�j��(�Q+n���Q[�84B`x�Z�/Uf0�P`]�V���^���M��;����榳XGΧ��Jo'��J�����R� �BJ
�ՉKg��{��a����r��F3�f�y@@�p��ڭ ?}93�̒�3y7QF�Ȼ�g��X��7������'z�=��������Z�e��.�$�w�X��ܗ7ظC����z�B^P.�!jZ�����f�"?�ʾ�u��M��A0߹X�ĐNm+���=�z�F��k���dV���ٓ3\n��2���6]մ���;)��%_-ӿ��ny�i���|������J�7u��U��Ǆ� �¯m$� s7����B&?K��
���Z��P�##Ϗ�����,��αP����n����N�w������2�^~���!eJRe��z����y8�M�fջ|3t��85n�ʙυ�kU�H�w��k�$�"������U��|L����8Ï3�Ի��Z$)��)���2G���L����o�鍣�����Z�%D=_�0�:F�X`����fu 2#<ۃQ��;�T�m�+v��m�N�Y�0��9��$y���wZ��6J*���L��/P\Ģ��Q�1�d�Kw�I�i�gD�DSM;�sa$y���ڑ�O�Քȷ`>4렵��u��Fd�?�=`@wV]��l�دZOgv��XQ���k0�ƫn���k�g阈m3�;�7�G����Qaʦ{mw�8]	tz���۽^?�(�)�,��_�'�u�z�jYl��{��ikU[4P�w���HqM����4Si&��Ѓ��#���Co"�;��6���&�5������*�4�mv� �  �l�m[�M(���ot�Zw���S*��L�PD��[ �9םWrs��q�d�AϘ����:�j.Sg����0�TG-� ��Uqݶ>5Q~����߲��8ͨ���x	�ӎ�ҍ�I]�y�:a�x���\j��ٖ��#8���i�İ���P��HOS�s����e�ň��|�5��{�� }���HOxxF���m��A�va6����VU��� �v0��]E�Y�N�	%�ȭ��ڻ��
tm}�����p�6zo��m��0�C�{<����G���y�l�\� ���eТX� ��5t1� T�ݎ+���o����[1��9�)`�`�4� �f�3i����K����k�:|�.�h�q��>��D�����馍�Xd;�������ҷ���˭���A7g�k1�w�A�: ��QG��w8�-��cZh�iO�kp�L�FŁCn]xp�ׇ\g��2����j���rq�K^�̧?�]^y��B+��Q>��A���E��g�T�4�(	3:ה1�c�#秃�z�R��
�3~��3�����|����N��$�~�y�"L�8�b�J|U�h*V�/o��6������np_,����o����a	5�GD�S:�:I��?+	�����~�|��f��6XS� ����p9��O�9�,���
!��=����.���6�l�����DSȺV��JW�Y
��n!�9�м��Mp��ϧV����L)�;	v�ۚx��u�o&�Nd�S7���o���y� u��`�b������Jnqk����(�
�,����A�����L���;�ߺ>����W��c�6G�[Ĉ����l�F�[�6[�[�f�/_�����W'��x��+���j��'�:DR!�=��z�Gv�>eȱhZ�e�!oHS�H���C|������-������="j;3����^H��t'�^Gv,l�[�i�b}�U/�A쇤���"�@�GDඥ �}�.���Ki��O�>���"��}���Ҥ*�@��w	5[���	�îѐ�zڧ+��P��.�y��G)��XSu��D֘2u�Z9qS�`ր"Y/�v@�� n�&tu^1�!���L�X6��e�}I�ltJĺ��Ed�5c��� �M%u}в�K+�z�J`�^z_�c���
S4%�(*�Q��B�2�>O��(�VM>3�������V	Y 8������������a�܌"���]f	� �j.)�M�n�_Es-p����x�� �� �t/�"����ᗯ�4��k~m�*ɘG��r�]�x�8�opY�P��"�B� F�#j�"���6&�������Cu��>��DMd^�Ańz(����?ڷr��k�����m�y�tH]��vy�bW�3Mp����U �dT�5u��4�ShO'C�X������ݖ��;Ϟ=�79�\�     