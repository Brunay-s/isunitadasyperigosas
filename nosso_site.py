import streamlit as st
import streamlit.components.v1 as components
from datetime import datetime
import base64
import random

# ---------------------------------------------------
# CONFIGURAÇÃO DA PÁGINA
# ---------------------------------------------------
st.set_page_config(
    page_title="Perigosas",
    page_icon="🏖️",
    layout="wide"
)

# ---------------------------------------------------
# MÁGICA 1: MEMÓRIA PARA CARREGAR FOTOS RÁPIDO
# ---------------------------------------------------
@st.cache_data
def get_base64(file_path):
    try:
        with open(file_path, "rb") as f:
            data = f.read()
        return base64.b64encode(data).decode()
    except:
        return None

# ---------------------------------------------------
# MÁGICA 2: MEMÓRIA PARA LER OS BILHETES
# ---------------------------------------------------
@st.cache_data
def pegar_bilhetes():
    try:
        # Se você tiver deixado o B maiúsculo no GitHub, mude aqui para Bilhetinhos_lista.txt
        with open('bilhetinhos_lista.txt', 'r', encoding='utf-8') as f: 
            texto_completo = f.read()
        lista_bruta = texto_completo.split('\n\n')
        return [b.strip() for b in lista_bruta if b.strip() != ""]
    except FileNotFoundError:
        return []

# ---------------------------------------------------
# MÁGICA 3: O ESCUDO DO SORTEADOR (ISOLAMENTO TOTAL)
# ---------------------------------------------------
@st.fragment
def renderizar_sorteador(bilhetes):
    col1, col2, col3 = st.columns([1,2,1])
    with col2:
        if st.button("✨ Sortear Novo Bilhete", use_container_width=True):
            st.session_state.bilhete_atual = random.choice(bilhetes)

        st.markdown(f"""
        <div style="
            background: #fdfaf3;
            padding: 40px;
            border-radius: 5px;
            border-left: 8px solid #d4a373;
            box-shadow: 2px 5px 15px rgba(0,0,0,0.1);
            margin-top: 20px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        ">
            <p style="
                font-family: 'Indie Flower', cursive;
                font-size: 1.8rem;
                color: #333;
                line-height: 1.4;
                white-space: pre-wrap; 
            ">
                "{st.session_state.bilhete_atual}"
            </p>
        </div>
        """, unsafe_allow_html=True)

# ---------------------------------------------------
# CSS CUSTOMIZADO
# ---------------------------------------------------
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Special+Elite&family=Indie+Flower&display=swap');

/* Fundo de Praia */
.stApp {
    background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), 
                url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80");
    background-size: cover;
    background-attachment: fixed;
}

/* Títulos */
h1, h2, h3 {
    font-family: 'Special Elite', cursive;
    color: #004e64 !important;
    text-shadow: 1px 1px 2px white;
}

/* GARANTINDO QUE A FAIXA CREME SUMA */
.stTabs [data-baseweb="tab-panel"] {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    padding-top: 15px;
}

/* Estilo Original das Abas */
.stTabs [data-baseweb="tab-list"] { gap: 8px; }
.stTabs [data-baseweb="tab"] {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px 10px 0 0;
    font-family: 'Special Elite';
}

/* Polaroid na Timeline */
.polaroid-frame {
    background: white;
    padding: 15px 15px 40px 15px;
    box-shadow: 5px 10px 20px rgba(0,0,0,0.2);
    border: 1px solid #ddd;
    margin-bottom: 30px;
    width: 100%;
    max-width: 300px;
    transition: transform 0.3s;
}

.polaroid-frame:hover {
    transform: scale(1.05) rotate(0deg) !important;
}
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------
# HEADER & SPOTIFY
# ---------------------------------------------------
col_titulo, col_spotify = st.columns([4, 1.5])

with col_titulo:
    st.markdown("""
    <div style="text-align: left; padding: 20px 0 0 20px;">
        <h1 style="font-size: 4rem; margin-bottom: 0;">Perigosas ao Mar 🌊</h1>
        <p style="font-family: 'Indie Flower'; font-size: 1.8rem; color: #004e64; margin-top: 0;">Nossa história em 30 cliques de sol e sal.</p>
    </div>
    """, unsafe_allow_html=True)

with col_spotify:
    st.markdown("<br>", unsafe_allow_html=True) 
    
    link_do_spotify = "https://open.spotify.com/playlist/2qd7rCB1hcrhscHnjthPA2?si=f5003a2ba4aa4841"

    def criar_player_spotify(link):
        if "track" in link:
            embed_url = link.replace("open.spotify.com/track", "open.spotify.com/embed/track")
        elif "playlist" in link:
            embed_url = link.replace("open.spotify.com/playlist", "open.spotify.com/embed/playlist")
        else:
            embed_url = link
        components.iframe(embed_url, height=80) 

    criar_player_spotify(link_do_spotify)

st.write("") 

# ---------------------------------------------------
# TABS
# ---------------------------------------------------
tab1, tab2, tab3, tab4, tab5 = st.tabs(["📍 Início", "📖 Até Aqui", "⏳ Contagem", "💌 Bilhetinhos", "✈️ Vem aí"])

with tab1:
    st.markdown("""
    <div style="background: rgba(253, 250, 243, 0.8); padding: 30px; border-radius: 15px; border-left: 10px solid #d4a373;">
        <h2 style="margin-top:0;">Oi meu amorzinho!</h2>
        <p style="font-size: 1.2rem; font-family: 'Indie Flower';">
            Fiz esse presente pra comemorar e relembrar um pouquinhos desses 4 anos de muita parceria, amor e periculosidade que define a gente!
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    st.write("")
    st.image("https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80", use_container_width=True)

    # ---------------------------------------------------
    # NOVA SEÇÃO: OS 4 MOTIVOS (Clean, com emojis!)
    # ---------------------------------------------------
    st.markdown("<hr style='border: 1px dashed #d4a373; margin: 40px 0;'>", unsafe_allow_html=True)
    st.markdown('<h2 style="text-align:center; color: #004e64 !important; font-family: \'Special Elite\'; margin-bottom: 30px;">4 Motivos (entre milhares) que me fazem te amar</h2>', unsafe_allow_html=True)
    
    col1, col2, col3, col4 = st.columns(4)

    motivos = [
        {
            "emoji": "👯‍♀️", 
            "titulo": "Nossa Parceria", 
            "texto": "Do baile da terceira idade aos bloquinhos de Salvador. A gente topa qualquer loucura juntas e faz tudo ser incrível."
        },
        {
            "emoji": "🏡", 
            "titulo": "Nosso Aconchego", 
            "texto": "Da pizza no colchão inflável ao nosso Xeque Mate caseiro. Onde você está, é onde eu me sinto em casa."
        },
        {
            "emoji": "🏕️", 
            "titulo": "Nossa Coragem", 
            "texto": "A força que a gente tem pra enfrentar a distância, as mudanças, montar apê do zero e até perrengue em barraca chovendo."
        },
        {
            "emoji": "✨", 
            "titulo": "Sua Essência", 
            "texto": "Pelo seu jeito, pelo seu cheiro no pescoço e por cada detalhe seu que deixa os meus dias muito mais felizes."
        }
    ]

    colunas = [col1, col2, col3, col4]

    for i, col in enumerate(colunas):
        with col:
            st.markdown(f"""
            <div style="
                background: rgba(255, 255, 255, 0.85); 
                padding: 25px 20px; 
                border-radius: 10px; 
                box-shadow: 2px 5px 15px rgba(0,0,0,0.05); 
                text-align: center; 
                height: 100%;
                border-top: 4px solid #d4a373;
            ">
                <div style="font-size: 3rem; margin-bottom: 10px;">{motivos[i]['emoji']}</div>
                <h4 style="font-family: 'Special Elite'; color: #004e64; margin-top: 0; margin-bottom: 15px; font-size: 1.2rem;">{motivos[i]['titulo']}</h4>
                <p style="font-family: 'Indie Flower'; font-size: 1.1rem; color: #444; line-height: 1.4; margin: 0;">
                    {motivos[i]['texto']}
                </p>
            </div>
            """, unsafe_allow_html=True)
with tab2:
    st.markdown('<h2 style="text-align:center;">Nossa Rota de Memórias</h2>', unsafe_allow_html=True)

    descricoes = [
        "Aqui eu não fazia ideia que um baile da terceira idade + forrozin com xero no pescoço + um 'eu quero beijar vcs duas' melhoraria tanto a minha vida 👵🏼👵🏻", "Começou com umas história de joguinho de date, cartinha mandando tirar foto da gata...", "AAí não teve jeito. Mandou logo um VAI TOMAR BANHO SUMA DAQUI 👺 Mas na verdade era só que eu já tinha ganhado o coração dela já",
        "Aí eu comecei a viajar com frequência pra Ubatuba. Esse pôr do sol com vc do lado e um Jesus na mente foi um presente do Universo 🌅", "Vc começou a viajar até meu país Franco da Rocha (provona de amor) até que aconteceu. ESTOY ENAMORADA POR TI, CARIÑO! 😍 Ela falou! É verdade, tá acontecendo!!!", "De repente todo fim de semana a gente tava junto. A intimidade foi crescendo, com ela os ÓÓÓÓÓHHH que vc tanto ama 🫵🥰",
        "E então veio a Lorena. O presentinho mais fofo e inesperado que me deixou derretida rsrs 🪴", "De repente a gata dirigiu OITO HORAS sozinha pra me encontrar e poder curtir uns dias bem juntinhas na Bahia 🏝️", "Aí não teve jeito, tive que voar pra Bahia pra encontrar vc também 🏖️. Um pouco tensa 'será que duas semanas na casa dela é muito? Será que a gente vai se dar bem?!' Mas com um visual desse, não tinha como dar errado 🌸🌊🌞",
        "De repente, uma nova fase: eu mudei. O ap não tinha nada, móveis, geladeira, fogão, não tinha nem piso... mas tinha vc! Vc tava lá comigo, me abraçando e apoiando em cada perrengue (e cada ida à Leroy kkk)🏡", "Essa foi a nossa primeira noite na casinha. Colchão inflável de solteira (depois vc me emprestou o seu de casal, obrigada por isso rs), pizza, seriezinha e muito amor ❤️", "E então veio o dia a dia. Cada vez mais presente, cada vez mais gostoso. Cada dia, uma fotinho nova no espelho (na ida ou na volta rs). Escolhi essa pq resume bem os últimos meses: a gente indo pro Papoulas, um Xeque Mate caseiro, e um milho pra minha mulher não bater em ninguém no caminho 📸🍻",
        "Perrengue né?! Barraca quebrada, chuva, chuva dentro da barraca quebrada. Guarda chuva quebrado aberto dentro da barraca quebrada que tava chovendo dentro ⛈️ Um aniversário muito especial! (apesar do frio que eu passei naquela noite pq eu tava no lado molhado do colchão) ", "Mas deu tudo certo! O festival foi maravilhoso e a gente tava maravilhosa como sempre 🎶", "O primeiro Eu Te Amo 🥹 Eu toda nervosa planejando te falar em um pico lindo, feliz que ia falar primeiro e te fazer uma surpresa... vc falou antes. gay panic. surpresa. assembléia. ''não quero que meu primeiro eu te amo seja um 'eu também' bêbada. mas se eu não responder nada ela vai achar que eu não amo. REAGE BRUNA. FALA ALGUMA COISA CRUELA. silêncio'' Mas no outro dia deu tudo certo, falei na borda infinita de uma cachoeira linda 🩵🌈",
        "aaaah o Carnaval... 'Vamo pra Salvador? Vamo! Vamo passar o dia bebendo em bloquinhos por SP antes do vôo? Vamo!' Eu amo isso na gente 🤗", "Mais um sonho realizado juntas! Carnaval em Salvador. Com direito a BaianaSystem 2x e Veveta dona do hit do Carnaval daquele ano AAAAAAAAHHHHRRRRR BEBÊ 🗣️🪂", "Aí descobrimos um novo vício juntas. Viramos a melhor dupla de sinuquinha 🎱",
        "A melhor conchinha do mundo. Sou muito feliz que a Juju também me escolheu! Aliás, não é por nada não, mas ela dorme comigo desde o dia 1 😸", "Aí veio a fase artista. 98374 ensaios na semana. 98273 apresentações. E vc sempre lá do meu lado. Mesmo depois da minha tentativa falha de tirar uma foto sexy 🥴", "Carnaval em SP. A gente não esperava muita coisa mas foi incrível. Claro né, com a melhor companhia do mundo todo não tem como ser ruim 🫵🍻",
        "Mais um episódio de 'Vamo? Vamo!' Bom demais curtir um rolezão com vc 👽", "Esse dia foi um dia comum. A gente chegou do bar igual sempre, demos um beijão tão gostoso (como sempre) mas que por algum motivo ficou guardado (e obrigada por ter filmado) 🫦💄", "Aniversário de namoro. Date surpresa. Será que eu devia ser romântica? Será que ela vai me odiar por colocar ela pra trabalhar de surpresa? Mas era óbvio que vc, com seu coração enorme iria amar fazer algo bom para as pessoas, enquanto experimenta uma atividade pela primeira vez comigo. Obrigada por ter um coração tão lindo. 🏠💪",
        "Nosso primeiro casamento juntas. Eu toda garouta princesa de madrinha e vc bem sexy saptônica de terninho. Que casalzão, ave 🤤", "Depois a gente inverteu. Vc toda princesa e eu sapatona. Foi meu primeiro casamento LGBT, foi muito lindo viver ele do seu lado e imaginar a gente, de repente 🌝👰🏻👰🏽", "Eu amo tanto nossas aleatoriedades, momentos ilha da bobeira 🥹 Esse foi um deles. Essa viagem foi um mix de sentimentos, era a última antes de eu vir pra cá. Uma mistura de melancolia com saudade antecipada.Parecia tão distante, tão difícil. E foi rs Mas agora já estamos aqui, na contagem regressiva, já quase posso sentir o seu toque. A gente conseguiu 🥹😍",
        "O surto da foto do peitinho 🗣️ Coloquei pra te zuar enquanto vc ia resolver algo da prancha e acabei ficando com a foto até as primeiras semanas na NZ. Pelo menos era um fundo de tela obra de arte né (só que eu tinha que falar por vídeo com a família entortando a cabeça, pra cobrir a tetinha de fora 🗣️🍈)", "Apenas nós duas 👭", "E que venham as próximas! 🚀"
    ]

    for i in range(1, 31):
        col_left, col_mid, col_right = st.columns([1, 1, 1])

        if i % 2 == 0:
            col_img = col_left
            col_text = col_right
        else:
            col_img = col_right
            col_text = col_left

        with col_img:
            extensoes = ['jpg', 'png', 'jpeg']
            img_data = None

            for ext in extensoes:
                img_path = f"foto {i}.{ext}"
                img_data = get_base64(img_path)
                if img_data:
                    break

            src = f"data:image/jpeg;base64,{img_data}" if img_data else "https://via.placeholder.com/300x400"
            rot = random.randint(-3, 3)

            st.markdown(f"""
            <div style="display: flex; justify-content: center;">
                <div class="polaroid-frame" style="transform: rotate({rot}deg);">
                    <img src="{src}" style="width:100%; height:auto;">
                </div>
            </div>
            """, unsafe_allow_html=True)

        with col_text:
            st.markdown(f"""
            <div style="
                background: rgba(255,255,255,0.7);
                padding: 20px;
                border-radius: 15px;
                font-family: 'Indie Flower';
            ">
                <b>#{i}</b><br>
                {descricoes[i-1]}
            </div>
            """, unsafe_allow_html=True)

with tab3:
    inicio = datetime(2023, 7, 12)
    hoje = datetime.now()
    dias = (hoje - inicio).days
    
    st.markdown(f"""
    <div style="text-align: center; padding: 80px; background: rgba(255, 255, 255, 0.6); border-radius: 50%; width: 400px; height: 400px; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; border: 5px dashed #d4a373;">
        <h2 style="font-size: 100px; margin: 0; color: #d4a373 !important;">{dias}</h2>
        <p style="font-family: 'Special Elite'; font-size: 20px;">Dias de sol ao seu lado</p>
    </div>
    """, unsafe_allow_html=True)

with tab4:
    st.markdown('<h2 style="text-align:center;">Caixinha de Bilhetes</h2>', unsafe_allow_html=True)
    st.markdown('<p style="text-align:center; font-family: \'Indie Flower\';">Clique no botão para sortear uma mensagem especial do nosso histórico.</p>', unsafe_allow_html=True)

    # Pegamos os bilhetes da memória rápida
    bilhetes = pegar_bilhetes()

    if len(bilhetes) == 0:
        st.error("⚠️ O arquivo 'bilhetinhos_lista.txt' não foi encontrado ou está vazio!")
    else:
        # Prepara a variável se for a primeira vez
        if 'bilhete_atual' not in st.session_state:
            st.session_state.bilhete_atual = "Clique no botão abaixo para ler um bilhetinho..."
        
        # Chama a mágica do escudo protetor!
        renderizar_sorteador(bilhetes)