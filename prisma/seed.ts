import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const venues = [
  {
    name: "Café com Letras",
    address: "Av. Getúlio Vargas, 1158 - Savassi",
    neighborhood: "Savassi",
    latitude: -19.9329,
    longitude: -43.9341,
    instagramUrl: "https://instagram.com/cafecomletras",
    websiteUrl: "https://cafecomletras.com.br",
    phone: "(31) 3261-0895",
  },
  {
    name: "Traço de União",
    address: "Rua Curitiba, 2233 - Santa Efigênia",
    neighborhood: "Santa Efigênia",
    latitude: -19.9259,
    longitude: -43.9372,
    instagramUrl: "https://instagram.com/tracodeuniao",
    phone: "(31) 3223-5551",
  },
  {
    name: "Clube da Esquina Bar",
    address: "Rua Paraisópolis, 738 - Santa Teresa",
    neighborhood: "Santa Teresa",
    latitude: -19.9115,
    longitude: -43.9408,
    instagramUrl: "https://instagram.com/clubedaesquinabar",
  },
  {
    name: "Teatro Carlos Prates",
    address: "Rua Aarão Reis, 1046 - Bonfim",
    neighborhood: "Bonfim",
    latitude: -19.9202,
    longitude: -43.9489,
    websiteUrl: "https://fundacaoculturalbh.gov.br",
  },
  {
    name: "Casa do Baile",
    address: "Av. Otacílio Negrão de Lima, 751 - Pampulha",
    neighborhood: "Pampulha",
    latitude: -19.8717,
    longitude: -43.9686,
    websiteUrl: "https://casadobaile.org.br",
    phone: "(31) 3277-7447",
  },
  {
    name: "Falke Bier - Lourdes",
    address: "Rua Fernandes Tourinho, 161 - Lourdes",
    neighborhood: "Lourdes",
    latitude: -19.9333,
    longitude: -43.9271,
    instagramUrl: "https://instagram.com/falkebier",
    websiteUrl: "https://falkebier.com.br",
  },
  {
    name: "Bar do Beto",
    address: "Rua Álvares Maciel, 308 - Santa Efigênia",
    neighborhood: "Santa Efigênia",
    latitude: -19.9248,
    longitude: -43.9368,
  },
  {
    name: "A Obra Café Cultural",
    address: "Rua Grão Pará, 1057 - Floresta",
    neighborhood: "Floresta",
    latitude: -19.9158,
    longitude: -43.9311,
    instagramUrl: "https://instagram.com/aobracafe",
  },
  {
    name: "Teatro Espanca",
    address: "Rua Platina, 125 - Bairro São Pedro",
    neighborhood: "São Pedro",
    latitude: -19.9291,
    longitude: -43.9507,
    websiteUrl: "https://teatroespanca.com.br",
    instagramUrl: "https://instagram.com/teatroespanca",
  },
  {
    name: "Cine Theatro Brasil",
    address: "Av. Amazonas, 315 - Centro",
    neighborhood: "Centro",
    latitude: -19.9167,
    longitude: -43.9419,
    websiteUrl: "https://cinetheatrobrasil.com.br",
  },
];

const artists = [
  { name: "Toninho Horta", genres: "jazz, bossa nova, MPB" },
  { name: "Wagner Tiso", genres: "jazz, MPB, instrumental" },
  { name: "Uakti", genres: "jazz, música instrumental, experimental" },
  { name: "Hamilton de Holanda", genres: "jazz, choro, MPB" },
  { name: "Mônica Salmaso", genres: "jazz, bossa nova, MPB" },
  { name: "Trio Corrente", genres: "jazz, choro, MPB" },
  { name: "Quarteto Jazz BH", genres: "jazz, standard" },
  { name: "Big Band Mineira", genres: "jazz, big band, swing" },
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

  // Clear existing data
  await prisma.eventEvidence.deleteMany();
  await prisma.eventArtist.deleteMany();
  await prisma.event.deleteMany();
  await prisma.post.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.venue.deleteMany();

  // Create venues
  const createdVenues = await Promise.all(
    venues.map((v) => prisma.venue.create({ data: v }))
  );

  console.log(`Created ${createdVenues.length} venues`);

  // Create artists
  const createdArtists = await Promise.all(
    artists.map((a) => prisma.artist.create({ data: a }))
  );

  console.log(`Created ${createdArtists.length} artists`);

  const now = new Date();
  const [cafeLetras, tracoUniao, clubeEsquina, teatroPrates, casaBaile, falke, barBeto, aObra, espanca, cineTheatro] = createdVenues;
  const [toninho, wagner, , hamilton, monica, trioCorrente, quartetoJazz, bigBand] = createdArtists;

  const events = [
    {
      title: "Toninho Horta — Noite de Bossa",
      description: "O lendário guitarrista e compositor mineiro apresenta seu repertório de bossa nova e jazz brasileiro, com músicas inéditas e clássicos da sua carreira.",
      startsAt: setTime(addDays(now, 0), 20, 0),
      venueId: cafeLetras.id,
      priceMin: 30,
      priceMax: 50,
      ticketUrl: "https://sympla.com.br",
      sourceUrl: "https://cafecomletras.com.br/agenda",
      status: "published",
      confidenceScore: 95,
      artists: [toninho.id],
    },
    {
      title: "Jam Session às Quartas",
      description: "A tradicional jam session do Traço de União. Palco aberto para músicos de todos os níveis. Entrada gratuita.",
      startsAt: setTime(addDays(now, 1), 21, 0),
      venueId: tracoUniao.id,
      priceMin: 0,
      priceMax: 0,
      sourceUrl: "https://instagram.com/tracodeuniao",
      status: "published",
      confidenceScore: 90,
      artists: [],
    },
    {
      title: "Hamilton de Holanda Quinteto",
      description: "O multipremiado bandolinista apresenta seu novo álbum com formação de quinteto, explorando fronteiras entre jazz, choro e música do mundo.",
      startsAt: setTime(addDays(now, 2), 20, 30),
      venueId: teatroPrates.id,
      priceMin: 60,
      priceMax: 100,
      ticketUrl: "https://sympla.com.br",
      sourceUrl: "https://fundacaoculturalbh.gov.br",
      status: "published",
      confidenceScore: 98,
      artists: [hamilton.id],
    },
    {
      title: "Wagner Tiso Trio — Homenagem a Milton",
      description: "Wagner Tiso presta tributo ao amigo Milton Nascimento em noite especial de jazz e MPB. Obras do Clube da Esquina revisitadas.",
      startsAt: setTime(addDays(now, 3), 19, 30),
      venueId: clubeEsquina.id,
      priceMin: 40,
      priceMax: 60,
      ticketUrl: "https://sympla.com.br",
      status: "published",
      confidenceScore: 93,
      artists: [wagner.id],
    },
    {
      title: "Big Band Mineira — Swing Night",
      description: "A Big Band Mineira apresenta um repertório especial de swing e big band jazz com 18 músicos no palco. Uma noite inesquecível de jazz orquestral.",
      startsAt: setTime(addDays(now, 4), 20, 0),
      venueId: casaBaile.id,
      priceMin: 50,
      priceMax: 80,
      ticketUrl: "https://sympla.com.br",
      status: "published",
      confidenceScore: 96,
      artists: [bigBand.id],
    },
    {
      title: "Quarteto Jazz BH — Standards",
      description: "O Quarteto Jazz BH interpreta os grandes clássicos do jazz americano: Coltrane, Miles Davis, Bill Evans e muito mais.",
      startsAt: setTime(addDays(now, 5), 21, 0),
      venueId: falke.id,
      priceMin: 0,
      priceMax: 0,
      sourceUrl: "https://falkebier.com.br/programacao",
      status: "published",
      confidenceScore: 88,
      artists: [quartetoJazz.id],
    },
    {
      title: "Mônica Salmaso — Voz e Violão",
      description: "Show intimista com a voz singular de Mônica Salmaso acompanhada apenas de violão. Repertório de bossa nova e jazz brasileiro.",
      startsAt: setTime(addDays(now, 6), 20, 0),
      venueId: aObra.id,
      priceMin: 35,
      priceMax: 55,
      ticketUrl: "https://sympla.com.br",
      status: "published",
      confidenceScore: 92,
      artists: [monica.id],
    },
    {
      title: "Noite de Blues — Open Bar",
      description: "Noite especial de blues com open bar a partir das 22h. Bandas convidadas e palco aberto.",
      startsAt: setTime(addDays(now, 7), 22, 0),
      venueId: barBeto.id,
      priceMin: 25,
      priceMax: 40,
      status: "published",
      confidenceScore: 82,
      artists: [],
    },
    {
      title: "Trio Corrente — Choro Jazz",
      description: "O aclamado Trio Corrente navega entre o choro brasileiro e o jazz americano em performance de alto nível técnico e emocional.",
      startsAt: setTime(addDays(now, 9), 20, 30),
      venueId: espanca.id,
      priceMin: 45,
      priceMax: 70,
      ticketUrl: "https://sympla.com.br",
      status: "published",
      confidenceScore: 94,
      artists: [trioCorrente.id],
    },
    {
      title: "Festival Jazz BH — Abertura",
      description: "Abertura do Festival de Jazz de BH com apresentações de artistas locais e nacionais. Programação especial com múltiplos palcos.",
      startsAt: setTime(addDays(now, 12), 17, 0),
      endsAt: setTime(addDays(now, 12), 23, 59),
      venueId: cineTheatro.id,
      priceMin: 0,
      priceMax: 0,
      sourceUrl: "https://festivaljazzbh.com.br",
      status: "published",
      confidenceScore: 97,
      artists: [toninho.id, hamilton.id],
    },
    {
      title: "Jazz na Pampulha — Família e Jazz",
      description: "Concerto ao ar livre com entrada gratuita. Programação especial para toda a família com jazz, bossa e choro.",
      startsAt: setTime(addDays(now, 14), 16, 0),
      venueId: casaBaile.id,
      priceMin: 0,
      priceMax: 0,
      status: "published",
      confidenceScore: 89,
      artists: [bigBand.id],
    },
    {
      title: "Bebop Session — Terças com Jazz",
      description: "A série de terças do Café com Letras dedicada ao bebop. Músicos convidados e um repertório que vai de Charlie Parker a Dizzy Gillespie.",
      startsAt: setTime(addDays(now, 15), 20, 0),
      venueId: cafeLetras.id,
      priceMin: 20,
      priceMax: 30,
      status: "published",
      confidenceScore: 91,
      artists: [quartetoJazz.id],
    },
    // Past event for variety
    {
      title: "Toninho Horta — Especial de Verão",
      description: "Show histórico do mestre Toninho Horta.",
      startsAt: setTime(addDays(now, -10), 20, 0),
      venueId: cafeLetras.id,
      priceMin: 40,
      priceMax: 60,
      status: "published",
      confidenceScore: 95,
      artists: [toninho.id],
    },
  ];

  for (const event of events) {
    const { artists: eventArtists, ...eventData } = event;
    const created = await prisma.event.create({ data: eventData });

    for (const artistId of eventArtists) {
      await prisma.eventArtist.create({
        data: { eventId: created.id, artistId },
      });
    }
  }

  console.log(`Created ${events.length} events`);

  // Create posts
  const posts = [
    {
      title: "Toninho Horta: 'O jazz e a bossa nova são irmãos siameses'",
      body: "Em entrevista exclusiva ao Portal Jazz BH, o guitarrista e compositor mineiro Toninho Horta fala sobre sua trajetória, suas influências no jazz americano e a vibrante cena jazzística de Belo Horizonte. 'BH sempre teve um palco especial para o jazz. Tem algo na nossa cidade que favorece esse encontro entre a tradição americana e a criatividade brasileira', conta o artista.",
      type: "interview",
      publishedAt: addDays(now, -2),
    },
    {
      title: "Novas casas de jazz abrem em BH e aquece a cena cultural",
      body: "A cena jazzística de Belo Horizonte está em ebulição. Novos bares e espaços culturais dedicados ao jazz surgem nos bairros da cidade, trazendo shows regulares e consolidando BH como um dos principais polos de jazz do país. O movimento começou com o retorno dos shows presenciais após a pandemia e ganhou força com o apoio de músicos locais e nacionais.",
      type: "news",
      publishedAt: addDays(now, -3),
    },
    {
      title: "Review: Festival Jazz BH 2025 foi um marco histórico",
      body: "O Festival de Jazz de Belo Horizonte 2025 entrou para a história como a edição mais completa desde a criação do evento. Com mais de 20 apresentações em 3 dias, o festival reuniu nomes como Hamilton de Holanda, Mônica Salmaso, Trio Corrente e artistas internacionais. A curadoria equilibrou o jazz tradicional com fusões experimentais, agradando tanto puristas quanto o público mais jovem.",
      type: "review",
      publishedAt: addDays(now, -5),
    },
    {
      title: "Agenda: Os melhores shows de jazz em BH neste mês",
      body: "Selecionamos os shows imperdíveis de jazz em Belo Horizonte para as próximas semanas. Com destaque para o retorno de Toninho Horta ao Café com Letras, a Swing Night da Big Band Mineira na Casa do Baile e o show intimista de Mônica Salmaso n'A Obra Café Cultural. Confira a agenda completa e garanta seu ingresso!",
      type: "announcement",
      publishedAt: addDays(now, -1),
    },
    {
      title: "Como o jazz mineiro influenciou a música brasileira",
      body: "Belo Horizonte foi palco de encontros fundamentais para a música brasileira. O Clube da Esquina, movimento que reuniu Milton Nascimento, Toninho Horta, Wagner Tiso e outros, bebeu diretamente do jazz americano para criar uma sonoridade única. Pesquisadores da UFMG traçam a linha histórica dessa influência que ainda ressoa na música produzida em BH.",
      type: "news",
      publishedAt: addDays(now, -7),
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log(`Created ${posts.length} posts`);
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
