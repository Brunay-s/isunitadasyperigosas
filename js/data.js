/* ------------------------------------------------------------
   1) BILHETINHOS
   ------------------------------------------------------------ */
const bilhetes_antigos = [];

/* ------------------------------------------------------------
   2) LINHA DO TEMPO ("História")
   ------------------------------------------------------------ */
const timeline = [
  { img: "images/foto 1.jpg", date: "2022", text: "Aqui eu não fazia ideia que um baile da terceira idade + forrozin com xero no pescoço + um 'eu quero beijar vcs duas' melhoraria tanto a minha vida 👵🏼👵🏻 " },
  { img: "images/foto 2.jpg", date: "2022", text: "Começou com umas história de joguinho de date, cartinha mandando tirar foto da gata..." },
  { img: "images/foto 3.jpg", date: "2022", text: "Aí não teve jeito. Mandou logo um VAI TOMAR BANHO SUMA DAQUI 👺 Mas na verdade era só que eu já tinha ganhado o coração dela já" },
  { img: "images/foto 4.jpg", date: "2022", text: "Aí eu comecei a viajar com frequência pra Ubatuba. Esse pôr do sol com vc do lado e um Jesus na mente foi um presente do Universo 🌅 " },
  { img: "images/foto 5.jpg", date: "2023", text: "Vc começou a viajar até meu país Franco da Rocha (provona de amor) até que aconteceu. ESTOY ENAMORADA POR TI, CARIÑO! 😍 Ela falou! É verdade, tá acontecendo!!!" },
  { img: "images/foto 6.jpg", date: "2023", text: "De repente todo fim de semana a gente tava junto. A intimidade foi crescendo, com ela os ÓÓÓÓÓHHH que vc tanto ama 🫵🥰" },
  { img: "images/foto 7.jpg", date: "2023", text: "E então veio a Lorena. O presentinho mais fofo e inesperado que me deixou derretida rsrs 🪴 " },
  { img: "images/foto 8.jpg", date: "2023", text: "De repente a gata dirigiu OITO HORAS sozinha pra me encontrar e poder curtir uns dias bem juntinhas na Bahia 🏝️ " },
  { img: "images/foto 9.jpg", date: "2023", text: "Aí não teve jeito, tive que voar pra Bahia pra encontrar vc também 🏖️. Um pouco tensa 'será que duas semanas na casa dela é muito? Será que a gente vai se dar bem?!' Mas com um visual desse, não tinha como dar errado 🌸🌊🌞" },
  { img: "images/foto 10.jpg", date: "2023", text: "De repente, uma nova fase: eu mudei. O ap não tinha nada, móveis, geladeira, fogão, não tinha nem piso... mas tinha vc! Vc tava lá comigo, me abraçando e apoiando em cada perrengue (e cada ida à Leroy kkk)🏡" },
  { img: "images/foto 11.jpg", date: "2023", text: "Essa foi a nossa primeira noite na casinha. Colchão inflável de solteira (depois vc me emprestou o seu de casal, obrigada por isso rs), pizza, seriezinha e muito amor ❤️" },
  { img: "images/foto 12.jpg", date: "2023", text: "E então veio o dia a dia. Cada vez mais presente, cada vez mais gostoso. Cada dia, uma fotinho nova no espelho (na ida ou na volta rs). Escolhi essa pq resume bem os últimos meses: a gente indo pro Papoulas, um Xeque Mate caseiro, e um milho pra minha mulher não bater em ninguém no caminho 📸🍻" },
  { img: "images/foto 13.jpg", date: "2023", text: "Perrengue né?! Barraca quebrada, chuva, chuva dentro da barraca quebrada. Guarda chuva quebrado aberto dentro da barraca quebrada que tava chovendo dentro ⛈️ Um aniversário muito especial! (apesar do frio que eu passei naquela noite pq eu tava no lado molhado do colchão) " },
  { img: "images/foto 14.jpg", date: "2024", text: "Mas deu tudo certo! O festival foi maravilhoso e a gente tava maravilhosa como sempre 🎶 " },
  { img: "images/foto 15.jpg", date: "2024", text: "O primeiro Eu Te Amo 🥹 Eu toda nervosa planejando te falar em um pico lindo, feliz que ia falar primeiro e te fazer uma surpresa... vc falou antes. gay panic. surpresa. assembléia. ''não quero que meu primeiro eu te amo seja um 'eu também' bêbada. mas se eu não responder nada ela vai achar que eu não amo. REAGE BRUNA. FALA ALGUMA COISA CRUELA. silêncio'' Mas no outro dia deu tudo certo, falei na borda infinita de uma cachoeira linda 🩵🌈 " },
  { img: "images/foto 16.jpg", date: "2024", text: "aaaah o Carnaval... 'Vamo pra Salvador? Vamo! Vamo passar o dia bebendo em bloquinhos por SP antes do vôo? Vamo!' Eu amo isso na gente 🤗 " },
  { img: "images/foto 17.jpg", date: "2024", text: "Mais um sonho realizado juntas! Carnaval em Salvador. Com direito a BaianaSystem 2x e Veveta dona do hit do Carnaval daquele ano AAAAAAAAHHHHRRRRR BEBÊ 🗣️🪂" },
  { img: "images/foto 18.jpg", date: "2024", text: "Aí descobrimos um novo vício juntas. Viramos a melhor dupla de sinuquinha. Às vezes o melhor quarteto: Bruna, Camila, Cruela e Flor 🎱" },
  { img: "images/foto 19.jpg", date: "2024", text: "A melhor conchinha do mundo. Sou muito feliz que a Juju também me escolheu! Aliás, não é por nada não, mas ela dorme comigo desde o dia 1 😸" },
  { img: "images/foto 20.jpg", date: "2025", text: "Aí veio a fase artista. 98374 ensaios na semana. 98273 apresentações. E vc sempre lá do meu lado. Mesmo depois da minha tentativa falha de tirar uma foto sexy 🥴" },
  { img: "images/foto 21.jpg", date: "2025", text: "Carnaval em SP. A gente não esperava muita coisa mas foi incrível. Claro né, com a melhor companhia do mundo todo não tem como ser ruim 🫵🍻" },
  { img: "images/foto 22.jpg", date: "2025", text: "Mais um episódio de 'Vamo? Vamo!' Bom demais curtir um rolezão com vc 👽" },
  { img: "images/foto 23.jpg", date: "2025", text: "Esse dia foi um dia comum. A gente chegou do bar igual sempre, demos um beijão tão gostoso (como sempre) mas que por algum motivo ficou guardado (e obrigada por ter filmado) 🫦💄" },
  { img: "images/foto 24.jpg", date: "2025", text: "Aniversário de namoro. Date surpresa. Será que eu devia ser romântica? Será que ela vai me odiar por colocar ela pra trabalhar de surpresa? Mas era óbvio que vc, com seu coração enorme iria amar fazer algo bom para as pessoas, enquanto experimenta uma atividade pela primeira vez comigo. Obrigada por ter um coração tão lindo. 🏠💪" },
  { img: "images/foto 25.jpg", date: "2025", text: "Nosso primeiro casamento juntas. Eu toda garouta princesa de madrinha e vc bem sexy saptônica de terninho. Que casalzão, ave 🤤" },
  { img: "images/foto 26.jpg", date: "2025", text: "Depois a gente inverteu. Vc toda princesa e eu sapatona. Foi meu primeiro casamento LGBT, foi muito lindo viver ele do seu lado e imaginar a gente, de repente 🌝👰🏻👰🏽" },
  { img: "images/foto 27.jpg", date: "2025", text: "Eu amo tanto nossas aleatoriedades, momentos ilha da bobeira 🥹 Esse foi um deles. Essa viagem foi um mix de sentimentos, era a última antes de eu vir pra cá. Uma mistura de melancolia com saudade antecipada.Parecia tão distante, tão difícil. E foi rs Mas agora já estamos aqui, na contagem regressiva, já quase posso sentir o seu toque. A gente conseguiu 🥹😍" },
  { img: "images/foto 28.jpg", date: "2025", text: "O surto da foto do peitinho 🗣️ Coloquei pra te zuar enquanto vc ia resolver algo da prancha e acabei ficando com a foto até as primeiras semanas na NZ. Pelo menos era um fundo de tela obra de arte né (só que eu tinha que falar por vídeo com a família entortando a cabeça, pra cobrir a tetinha de fora 🗣️🍈)" }
];

/* ------------------------------------------------------------
   3) ROTEIRO / CHECKLIST
   ------------------------------------------------------------ */
const roteiro = [
  { title: "Lençóis Maranhense", text: "Próxima aventura", done: false },
  { title: "Vale Pati", text: "Próxima aventura", done: false },
  { title: "Amazonas", text: "Próxima aventura", done: false },
  { title: "China", text: "Próxima aventura", done: false },
  { title: "Vietnã", text: "Próxima aventura", done: false },
  { title: "Tailândia", text: "Próxima aventura", done: false },
  { title: "Patagônia", text: "Próxima aventura", done: false },
  { title: "África do Sul", text: "Próxima aventura", done: false },
  { title: "Machu Picchu", text: "Próxima aventura", done: false }
];
