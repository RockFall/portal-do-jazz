import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const venues = [
  {
    name: "Clube de Jazz do Café com Letras",
    address: "Rua Antônio de Albuquerque, 47 – Funcionários",
    neighborhood: "Funcionários",
    latitude: -19.935,
    longitude: -43.9378,
    instagramUrl: "https://instagram.com/clubedejazzdocafe",
    websiteUrl: "https://clubedejazzdocafe.com",
    phone: "(31) 98872-4989",
  },
  {
    name: "Mina Jazz Bar",
    address: "Av. Afonso Pena, 1394 – Centro",
    neighborhood: "Centro",
    latitude: -19.9226,
    longitude: -43.9383,
    instagramUrl: "https://instagram.com/minajazzbar",
    websiteUrl: "https://minajazzbar.com",
  },
  {
    name: "Café com Letras",
    address: "Rua Antônio de Albuquerque, 781 – Savassi",
    neighborhood: "Savassi",
    latitude: -19.9358,
    longitude: -43.9384,
    instagramUrl: "https://instagram.com/cafe_com_letras",
    websiteUrl: "https://cafecomletras.com.br",
    phone: "(31) 3225-9973",
  },
  {
    name: "Jângal PubGarden",
    address: "Rua Outono, 523 – Cruzeiro",
    neighborhood: "Cruzeiro",
    latitude: -19.949,
    longitude: -43.9428,
    instagramUrl: "https://instagram.com/jangalbh",
    websiteUrl: "https://jangalbh.com",
    phone: "(31) 98015-1182",
  },
  {
    name: "Soul Jazz Burger – Santa Tereza",
    address: "Rua Conselheiro Rocha, 2809 – Santa Tereza",
    neighborhood: "Santa Tereza",
    latitude: -19.9168,
    longitude: -43.9091,
    instagramUrl: "https://instagram.com/souljazzburger",
    websiteUrl: "https://souljazzburger.com.br",
  },
  {
    name: "Baretto – Hotel Fasano BH",
    address: "Rua São Paulo, 2320 – Lourdes",
    neighborhood: "Lourdes",
    latitude: -19.9463,
    longitude: -43.9318,
    instagramUrl: "https://instagram.com/barettobh",
    websiteUrl: "https://fasano.com.br/gastronomia/baretto-belo-horizonte",
    phone: "(31) 3500-8970",
  },
  {
    name: "Madame Geneva",
    address: "Rua Elias Antônio Jorge, 21A – Luxemburgo",
    neighborhood: "Luxemburgo",
    latitude: -19.9447,
    longitude: -43.9306,
    instagramUrl: "https://instagram.com/madamegeneva_bh",
    phone: "(31) 98482-1133",
  },
  {
    name: "Casa Fiat de Cultura",
    address: "Praça da Liberdade, 10 – Funcionários",
    neighborhood: "Funcionários",
    latitude: -19.939,
    longitude: -43.9357,
    instagramUrl: "https://instagram.com/casafiatdecultura",
    websiteUrl: "https://casafiatdecultura.com.br",
    phone: "(31) 3289-8900",
  },
  {
    name: "MM Gerdau – Museu das Minas e do Metal",
    address: "Praça da Liberdade, 680 – Funcionários",
    neighborhood: "Funcionários",
    latitude: -19.9382,
    longitude: -43.9358,
    instagramUrl: "https://instagram.com/mmgerdau",
    websiteUrl: "https://mmgerdau.org.br",
    phone: "(31) 3516-7200",
  },
  {
    name: "Soul Jazz Burger – Pampulha",
    address: "Rua Noraldino Lima, 387 – Pampulha",
    neighborhood: "Pampulha",
    latitude: -19.854,
    longitude: -43.9594,
    instagramUrl: "https://instagram.com/souljazzburger",
    websiteUrl: "https://souljazzburger.com.br",
    phone: "(31) 2528-1232",
  },
  {
    name: "Santa Praça",
    address: "Rua Adamina, 64 – Santa Tereza",
    neighborhood: "Santa Tereza",
    latitude: -19.918,
    longitude: -43.908,
    phone: "(31) 3243-5993",
  },
  {
    name: "Teatro Raul Belém Machado",
    address: "Rua Leonil Prata, s/nº – Alípio de Melo",
    neighborhood: "Pampulha",
    latitude: -19.871,
    longitude: -44.01,
    instagramUrl: "https://instagram.com/teatroraulbelemmachado",
  },
];

const artists = [
  {
    name: "Chico Amaral",
    genres: "jazz, MPB instrumental",
    instagramUrl: "https://instagram.com/chicoamaralsax",
    bio: "Saxofonista e ex-letrista do Skank. Residente do Quintajazz no Jângal toda quinta-feira. Álbum 'Canções Brasileiras' (2024).",
  },
  {
    name: "Antonio Loureiro",
    genres: "jazz, MPB instrumental",
    instagramUrl: "https://instagram.com/antonioloureiromusic",
    bio: "Multi-instrumentista (vibrafone, piano, bateria, voz). Formado na UFMG, com álbuns internacionais aclamados pela crítica.",
  },
  {
    name: "Felipe Continentino",
    genres: "jazz contemporâneo",
    bio: "Baterista e compositor. Múltiplo vencedor do BDMG Instrumental (2014, 2017, 2019, 2021). Um dos nomes mais premiados do jazz mineiro.",
  },
  {
    name: "Toninho Horta",
    genres: "jazz fusion, bossa nova, MPB",
    bio: "Lenda da música brasileira. Guitarrista e compositor, um dos fundadores do Clube da Esquina. Mais de 50 anos de carreira internacional.",
  },
  {
    name: "Carolina Serdeira",
    genres: "samba-jazz, MPB",
    bio: "Cantora e diretora artística do Jazz Brasil Festival. 18 anos de carreira com shows no Brasil e na Europa.",
  },
  {
    name: "Izzy Gordon",
    genres: "jazz, blues, funk, soul",
    instagramUrl: "https://instagram.com/izzygordon",
    bio: "Sobrinha de Dolores Duran. Conhecida pelo show tributo 'Ella & Dolores', homenageando Ella Fitzgerald e sua tia.",
  },
  {
    name: "Tamara Franklin",
    genres: "jazz, samba, afrobrasileiro",
    instagramUrl: "https://instagram.com/tamara_franklinn",
    bio: "Cantora de voz poderosa que une jazz, RAP, samba e musicalidade afrobrasileira. Presença frequente nos festivais de BH.",
  },
  {
    name: "Jamba Trio",
    genres: "jazz, bossa nova",
    bio: "Fundado em 1995, o Jamba Trio é um dos conjuntos de jazz mais sólidos e duradouros de BH, com 25+ anos de história.",
  },
  {
    name: "Fred Selva Trio",
    genres: "jazz contemporâneo",
    bio: "Trio instrumental expoente da cena mineira. Apresentações frequentes em festivais e casas de jazz de BH.",
  },
  {
    name: "Vinícius Mendes",
    genres: "jazz contemporâneo, free jazz",
    instagramUrl: "https://instagram.com/vinicius_mendes_rodrigues",
    bio: "Saxofonista e flautista formado na UFMG. Lançamentos pelo selo alemão Notes on a Journey. Referência do jazz contemporâneo mineiro.",
  },
];

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function setTime(date: Date, hours: number, minutes = 0): Date {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

async function main() {
  console.log("Seeding database...");

  await prisma.eventEvidence.deleteMany();
  await prisma.eventArtist.deleteMany();
  await prisma.event.deleteMany();
  await prisma.post.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.venue.deleteMany();

  const createdVenues = await Promise.all(venues.map((v) => prisma.venue.create({ data: v })));
  console.log(`✓ ${createdVenues.length} locais criados`);

  const createdArtists = await Promise.all(artists.map((a) => prisma.artist.create({ data: a })));
  console.log(`✓ ${createdArtists.length} artistas criados`);

  const now = new Date();
  const [
    clubeJazz, minaJazz, cafeLetras, jangal, soulJazzST,
    baretto, madameGeneva, casaFiat, mmGerdau, soulJazzPampulha,
    santaPraca, teatroRaul,
  ] = createdVenues;
  const [
    chicoAmaral, antonioLoureiro, felipeContinentino, toninoHorta,
    carolinaSerdeira, izzyGordon, tamaraFranklin, jambaTrio,
    fredSelva, viniciusMendes,
  ] = createdArtists;

  const events = [
    // Programação regular: Quintajazz no Jângal (toda quinta)
    {
      title: "Quintajazz com Chico Amaral",
      description: "Toda quinta-feira o saxofonista Chico Amaral apresenta o Quintajazz com sua banda no Jângal. Clássicos do jazz, bossa nova e improvisações num ambiente arborizado e acolhedor no Cruzeiro.",
      startsAt: setTime(addDays(now, 1), 20, 0),
      venueId: jangal.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://jangalbh.com",
      status: "published", confidenceScore: 95,
      artists: [chicoAmaral.id],
    },
    {
      title: "Quintajazz com Chico Amaral",
      description: "Toda quinta-feira o saxofonista Chico Amaral apresenta o Quintajazz com sua banda no Jângal. Clássicos do jazz, bossa nova e improvisações num ambiente arborizado e acolhedor no Cruzeiro.",
      startsAt: setTime(addDays(now, 8), 20, 0),
      venueId: jangal.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://jangalbh.com",
      status: "published", confidenceScore: 95,
      artists: [chicoAmaral.id],
    },
    {
      title: "Quintajazz com Chico Amaral",
      description: "Toda quinta-feira o saxofonista Chico Amaral apresenta o Quintajazz com sua banda no Jângal. Clássicos do jazz, bossa nova e improvisações num ambiente arborizado e acolhedor no Cruzeiro.",
      startsAt: setTime(addDays(now, 15), 20, 0),
      venueId: jangal.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://jangalbh.com",
      status: "published", confidenceScore: 95,
      artists: [chicoAmaral.id],
    },
    // Clube de Jazz – programação regular
    {
      title: "Vinícius Mendes Quarteto – Tributo a Monk",
      description: "O saxofonista Vinícius Mendes apresenta seu quarteto com repertório de jazz contemporâneo e tributo a Thelonious Monk. Formado na UFMG e com lançamentos pelo selo alemão Notes on a Journey.",
      startsAt: setTime(addDays(now, 2), 20, 30),
      venueId: clubeJazz.id,
      priceMin: 30, priceMax: 50,
      ticketUrl: "https://bileto.sympla.com.br/clubedejazzdocafecomletras",
      sourceUrl: "https://clubedejazzdocafe.com",
      status: "published", confidenceScore: 97,
      artists: [viniciusMendes.id],
    },
    {
      title: "Sábado Blues – Clube de Jazz",
      description: "A curadoria especial de blues do Clube de Jazz. Músicos da cena mineira apresentam programa dedicado ao blues e suas conexões com o jazz num dos espaços mais dedicados ao gênero em BH.",
      startsAt: setTime(addDays(now, 3), 21, 30),
      venueId: clubeJazz.id,
      priceMin: 25, priceMax: 40,
      ticketUrl: "https://bileto.sympla.com.br/clubedejazzdocafecomletras",
      sourceUrl: "https://clubedejazzdocafe.com",
      status: "published", confidenceScore: 91,
      artists: [],
    },
    {
      title: "Carolina Serdeira – Samba-Jazz",
      description: "A diretora artística do Jazz Brasil Festival apresenta seu show de samba-jazz com 18 anos de carreira. Voz marcante e repertório que celebra o melhor da música brasileira instrumental.",
      startsAt: setTime(addDays(now, 10), 21, 0),
      venueId: clubeJazz.id,
      priceMin: 35, priceMax: 55,
      ticketUrl: "https://bileto.sympla.com.br/clubedejazzdocafecomletras",
      sourceUrl: "https://clubedejazzdocafe.com",
      status: "published", confidenceScore: 95,
      artists: [carolinaSerdeira.id],
    },
    {
      title: "Antonio Loureiro – Show Solo",
      description: "O multi-instrumentista mineiro Antonio Loureiro apresenta show solo explorando vibrafone, piano e voz. Um dos artistas mais reconhecidos da música instrumental brasileira, com carreira internacional.",
      startsAt: setTime(addDays(now, 17), 21, 0),
      venueId: clubeJazz.id,
      priceMin: 45, priceMax: 70,
      ticketUrl: "https://bileto.sympla.com.br/clubedejazzdocafecomletras",
      sourceUrl: "https://clubedejazzdocafe.com",
      status: "published", confidenceScore: 97,
      artists: [antonioLoureiro.id],
    },
    // Café com Letras – Quarta Jazz
    {
      title: "Toninho Horta – Quarta Jazz",
      description: "O lendário guitarrista e compositor mineiro participa do projeto Quarta Jazz do Café com Letras, revisitando clássicos da bossa nova e do jazz brasileiro do período 1950–1970.",
      startsAt: setTime(addDays(now, 5), 20, 0),
      venueId: cafeLetras.id,
      priceMin: 40, priceMax: 60,
      ticketUrl: "https://sympla.com.br",
      sourceUrl: "https://cafecomletras.com.br",
      status: "published", confidenceScore: 94,
      artists: [toninoHorta.id],
    },
    {
      title: "Jamba Trio – 25 anos de Jazz",
      description: "O Jamba Trio, fundado em 1995, celebra mais de 25 anos de história numa noite especial no Café com Letras. Repertório que vai do jazz mainstream à bossa nova com a sofisticação de um dos grupos mais sólidos de BH.",
      startsAt: setTime(addDays(now, 12), 20, 0),
      venueId: cafeLetras.id,
      priceMin: 30, priceMax: 50,
      ticketUrl: "https://sympla.com.br",
      sourceUrl: "https://cafecomletras.com.br",
      status: "published", confidenceScore: 93,
      artists: [jambaTrio.id],
    },
    // Mina Jazz Bar
    {
      title: "Noite de Jazz no Mina",
      description: "O sofisticado Mina Jazz Bar recebe show especial de jazz no coração do Centro histórico de BH. Ambiente vintage no edifício tombado do antigo Automóvel Clube de Minas, coquetelaria elaborada.",
      startsAt: setTime(addDays(now, 4), 21, 0),
      venueId: minaJazz.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://minajazzbar.com",
      status: "published", confidenceScore: 90,
      artists: [],
    },
    {
      title: "Izzy Gordon – Ella & Dolores",
      description: "A sobrinha de Dolores Duran apresenta seu show tributo 'Ella & Dolores', homenageando Ella Fitzgerald e Dolores Duran. Voz privilegiada e banda de alto nível no Mina Jazz Bar.",
      startsAt: setTime(addDays(now, 11), 21, 0),
      venueId: minaJazz.id,
      priceMin: 50, priceMax: 80,
      ticketUrl: "https://sympla.com.br",
      sourceUrl: "https://instagram.com/minajazzbar",
      status: "published", confidenceScore: 96,
      artists: [izzyGordon.id],
    },
    // Madame Geneva – Jazz toda quinta
    {
      title: "Jazz na Madame Geneva",
      description: "Toda quinta-feira o Madame Geneva recebe jazz ao vivo em seu espaço cênico no Luxemburgo. Drinks criativos e boa música num bar intimista.",
      startsAt: setTime(addDays(now, 6), 20, 0),
      venueId: madameGeneva.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://instagram.com/madamegeneva_bh",
      status: "published", confidenceScore: 85,
      artists: [],
    },
    {
      title: "Jazz na Madame Geneva",
      description: "Toda quinta-feira o Madame Geneva recebe jazz ao vivo em seu espaço cênico no Luxemburgo. Drinks criativos e boa música num bar intimista.",
      startsAt: setTime(addDays(now, 13), 20, 0),
      venueId: madameGeneva.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://instagram.com/madamegeneva_bh",
      status: "published", confidenceScore: 85,
      artists: [],
    },
    // Baretto BH
    {
      title: "Baretto Sessions – Jazz & MPB",
      description: "O elegante bar do Hotel Fasano BH apresenta sua programação semanal de jazz e MPB ao vivo. Ambiente sofisticado, menu de coquetelaria clássica.",
      startsAt: setTime(addDays(now, 7), 21, 30),
      venueId: baretto.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://fasano.com.br/gastronomia/baretto-belo-horizonte",
      status: "published", confidenceScore: 88,
      artists: [],
    },
    // Soul Jazz Burger
    {
      title: "Jazz ao Vivo – Soul Jazz Burger Santa Tereza",
      description: "Show de jazz ao vivo no ambiente temático do Soul Jazz Burger. Música candlelight, hambúrgueres gourmet e a melhor cena jazzística de Santa Tereza.",
      startsAt: setTime(addDays(now, 9), 19, 0),
      venueId: soulJazzST.id,
      priceMin: 15, priceMax: 15,
      sourceUrl: "https://sympla.com.br",
      status: "published", confidenceScore: 88,
      artists: [],
    },
    {
      title: "Tamara Franklin – Jazz & Afrobrasileiro",
      description: "A cantora Tamara Franklin traz show que une jazz, samba e musicalidade afrobrasileira. Voz poderosa e repertório original numa noite memorável no Soul Jazz Burger.",
      startsAt: setTime(addDays(now, 25), 20, 30),
      venueId: soulJazzST.id,
      priceMin: 20, priceMax: 35,
      ticketUrl: "https://sympla.com.br",
      sourceUrl: "https://instagram.com/souljazzburger",
      status: "published", confidenceScore: 90,
      artists: [tamaraFranklin.id],
    },
    {
      title: "Jazz ao Vivo – Soul Jazz Burger Pampulha",
      description: "Show de jazz ao vivo na unidade Pampulha do Soul Jazz Burger. Shows às quartas e domingos com músicos da cena mineira.",
      startsAt: setTime(addDays(now, 14), 19, 30),
      venueId: soulJazzPampulha.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://instagram.com/souljazzburger",
      status: "published", confidenceScore: 85,
      artists: [],
    },
    // Savassi Festival 2026 (24–31 mai 2026 – confirmado)
    {
      title: "Savassi Festival 2026 – Abertura",
      description: "24ª edição do maior festival de jazz de Minas Gerais. Abertura com programação especial no Clube de Jazz do Café com Letras. Uma semana de shows com artistas nacionais e internacionais espalhados por 8 espaços da Savassi e adjacências. Entrada gratuita.",
      startsAt: setTime(addDays(now, 16), 18, 0),
      venueId: clubeJazz.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://savassifestival.com.br",
      status: "published", confidenceScore: 97,
      artists: [],
    },
    {
      title: "Savassi Festival 2026 – Chico Amaral",
      description: "O saxofonista Chico Amaral apresenta seu show com o álbum 'Canções Brasileiras' durante o Savassi Festival. Um dos momentos mais esperados da 24ª edição.",
      startsAt: setTime(addDays(now, 18), 20, 0),
      venueId: cafeLetras.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://savassifestival.com.br",
      status: "published", confidenceScore: 96,
      artists: [chicoAmaral.id],
    },
    {
      title: "Savassi Festival 2026 – Jamba Trio",
      description: "O Jamba Trio apresenta show especial no Savassi Festival. Mais de 25 anos de história e repertório que vai do jazz mainstream à bossa nova.",
      startsAt: setTime(addDays(now, 19), 19, 30),
      venueId: clubeJazz.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://savassifestival.com.br",
      status: "published", confidenceScore: 94,
      artists: [jambaTrio.id],
    },
    {
      title: "Savassi Festival 2026 – Música na Praça",
      description: "O Savassi Festival leva shows gratuitos à Praça Floriano Peixoto com palco dedicado a artistas nacionais. Programação ao ar livre com entrada franca.",
      startsAt: setTime(addDays(now, 21), 17, 0),
      venueId: casaFiat.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://savassifestival.com.br",
      status: "published", confidenceScore: 92,
      artists: [],
    },
    // MM Gerdau – Festival Tudo é Jazz (previsto jul 2026)
    {
      title: "Felipe Continentino Trio – Festival Tudo é Jazz",
      description: "Múltiplo vencedor do BDMG Instrumental, o baterista e compositor Felipe Continentino apresenta seu trio no MM Gerdau. Entrada gratuita como parte da 24ª edição do Festival Tudo é Jazz.",
      startsAt: setTime(addDays(now, 70), 20, 0),
      venueId: mmGerdau.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://instagram.com/mmgerdau",
      status: "published", confidenceScore: 93,
      artists: [felipeContinentino.id],
    },
    {
      title: "Izzy Gordon – Tudo é Jazz",
      description: "Izzy Gordon apresenta o show 'Ella & Dolores' no Festival Tudo é Jazz, edição 2026. A cantora homenageia Ella Fitzgerald e Dolores Duran numa das noites mais esperadas do festival.",
      startsAt: setTime(addDays(now, 71), 19, 0),
      venueId: mmGerdau.id,
      priceMin: 0, priceMax: 0,
      sourceUrl: "https://instagram.com/tudoejazz",
      status: "published", confidenceScore: 95,
      artists: [izzyGordon.id],
    },
    // Santa Praça – Quinta Jazz
    {
      title: "Quinta Jazz – Santa Praça",
      description: "Toda quinta-feira a Santa Praça recebe show dedicado ao jazz. Espaço em mansão histórica de Santa Tereza, próximo à Praça Duque de Caxias.",
      startsAt: setTime(addDays(now, 22), 20, 0),
      venueId: santaPraca.id,
      priceMin: 0, priceMax: 0,
      status: "published", confidenceScore: 83,
      artists: [],
    },
    // Fred Selva Trio
    {
      title: "Fred Selva Trio – Jazz Instrumental",
      description: "O Fred Selva Trio apresenta repertório de jazz contemporâneo com influências brasileiras. Grupo expoente da cena instrumental mineira com shows frequentes nos festivais de BH.",
      startsAt: setTime(addDays(now, 30), 20, 0),
      venueId: santaPraca.id,
      priceMin: 30, priceMax: 45,
      ticketUrl: "https://sympla.com.br",
      status: "published", confidenceScore: 88,
      artists: [fredSelva.id],
    },
    // Teatro Raul Belém Machado – Jazz Brasil Festival (set 2026)
    {
      title: "Jazz Brasil Festival 2026 – 6ª Edição",
      description: "6ª edição do Jazz Brasil Festival com direção artística de Carolina Serdeira. Ingressos simbólicos. Teatro Raul Belém Machado, Regional Pampulha.",
      startsAt: setTime(addDays(now, 130), 20, 0),
      venueId: teatroRaul.id,
      priceMin: 2, priceMax: 2,
      sourceUrl: "https://www.bheventos.com.br",
      status: "published", confidenceScore: 88,
      artists: [carolinaSerdeira.id],
    },
  ];

  for (const event of events) {
    const { artists: eventArtists, ...eventData } = event;
    const created = await prisma.event.create({ data: eventData });
    for (const artistId of eventArtists) {
      await prisma.eventArtist.create({ data: { eventId: created.id, artistId } });
    }
  }
  console.log(`✓ ${events.length} eventos criados`);

  const posts = [
    {
      title: "Savassi Festival 2026: programação da 24ª edição começa em 24 de maio",
      body: "O Savassi Festival confirma sua 24ª edição entre os dias 24 e 31 de maio de 2026, consolidando-se como o maior festival de jazz de Minas Gerais. Com programação distribuída por 8 espaços da Savassi e adjacências — incluindo o Clube de Jazz do Café com Letras, Café com Letras, Ototoi Bar de Discos, Livraria da Rua, Conservatório UFMG e praças ao ar livre —, o festival deverá reunir artistas nacionais e internacionais ao longo de uma semana. As edições anteriores trouxeram nomes como Joyce Moreno (BR), Ryan Keberle (EUA) e Sima Mashazi (África do Sul). A entrada é gratuita na maioria das atrações.",
      type: "announcement",
      publishedAt: addDays(now, -3),
    },
    {
      title: "Clube de Jazz do Café com Letras: o coração da cena jazzística de BH",
      body: "Inaugurado em julho de 2022 pelo produtor Bruno Golgher — organizador do próprio Savassi Festival —, o Clube de Jazz do Café com Letras rapidamente se tornou o endereço mais importante do jazz em Belo Horizonte. Localizado na Rua Antônio de Albuquerque, 47, em Funcionários, o espaço para 100 pessoas funciona seis noites por semana e integra o ecossistema do histórico Café com Letras. Artistas estabelecidos às quartas, jazz protagonista às sextas e sábados, blues aos sábados com curadoria especial. Já tem 53 mil seguidores no Instagram (@clubedejazzdocafe).",
      type: "news",
      publishedAt: addDays(now, -7),
    },
    {
      title: "Mina Jazz Bar: jazz sofisticado no Centro histórico de BH",
      body: "Instalado no antigo Salão de Música do Automóvel Clube de Minas Gerais — edificação tombada do início do século XX —, o Mina Jazz Bar é uma das casas de jazz mais sofisticadas do Brasil. Fundado pelo vereador Gabriel Azevedo e o chef Léo Paixão, funciona de quarta a sábado na Av. Afonso Pena, 1394. Com 102 mil seguidores no Instagram (@minajazzbar), o espaço combina jazz ao vivo diário, coquetelaria elaborada e um ambiente vintage que transporta o público para a era dourada do gênero.",
      type: "news",
      publishedAt: addDays(now, -5),
    },
    {
      title: "Chico Amaral: do Skank ao jazz instrumental – a reinvenção de um letrista",
      body: "Conhecido por décadas de parceria com o Skank como letrista, Chico Amaral revelou ao mundo do jazz um saxofonista completo e sensível. Seu álbum 'Canções Brasileiras' (2024) é um dos trabalhos mais celebrados da música instrumental mineira recente. Toda quinta-feira ele comanda o Quintajazz no Jângal PubGarden, no Cruzeiro, levando jazz ao vivo gratuito a um dos bares mais acolhedores de BH. Acompanhe no Instagram @chicoamaralsax.",
      type: "interview",
      publishedAt: addDays(now, -10),
    },
    {
      title: "Antonio Loureiro: o multi-instrumentista que coloca BH no mapa do jazz mundial",
      body: "Vibrafone, piano, bateria, voz — Antonio Loureiro domina tudo com igual maestria. Formado na Escola de Música da UFMG, o músico mineiro construiu uma carreira internacional sólida com álbuns elogiados pela crítica especializada mundial. Presença frequente no Clube de Jazz do Café com Letras, Antonio Loureiro é um dos embaixadores mais eloquentes do jazz de Belo Horizonte para o mundo. Siga no Instagram @antonioloureiromusic.",
      type: "interview",
      publishedAt: addDays(now, -14),
    },
    {
      title: "Guia: onde ouvir jazz em BH em 2026",
      body: "Belo Horizonte vive um momento especial para o jazz. Da Savassi ao Cruzeiro, de Lourdes a Santa Tereza, a cidade tem hoje mais de uma dezena de espaços com programação regular de jazz ao vivo. Os destaques: Clube de Jazz do Café com Letras (Rua Antônio de Albuquerque, 47) com shows 6 noites por semana; Mina Jazz Bar (Av. Afonso Pena, 1394) no elegante Automóvel Clube tombado; Jângal PubGarden (Rua Outono, 523, Cruzeiro) com o Quintajazz toda quinta; Baretto do Hotel Fasano (Rua São Paulo, 2320, Lourdes) com jazz de quinta a sábado; e Soul Jazz Burger com unidades em Santa Tereza e Pampulha. E ainda os grandes festivais: Savassi Festival (maio/junho), Tudo é Jazz (julho) e Jazz Brasil Festival (setembro).",
      type: "news",
      publishedAt: addDays(now, -1),
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }
  console.log(`✓ ${posts.length} posts criados`);

  console.log("\n✅ Seed completo!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
