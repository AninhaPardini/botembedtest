// Require the necessary discord.js classes
const dotenv = require('dotenv').config();
const {
  ActionRowBuilder,
  ButtonBuilder,
  AttachmentBuilder,
  StringSelectMenuBuilder,
} = require('@discordjs/builders');
const {
  Client,
  GatewayIntentBits,
  Events,
  ButtonStyle,
  InteractionType,
  ComponentType,
  EmbedBuilder,
  MessageManager,
} = require('discord.js');

// Ids dos botões
const INTERACTION_IDS = {
  BUTTON_OK: 'btn-1',
  BUTTON_RULES: 'btn-2',
  BUTTON_REGION: 'bt-3',
  BUTTON_REGIONCPS: 'bt-4',
  BUTTON_REGIONMG: 'bt-5',
  BUTTON_REGIONCP: 'bt-6',
  BUTTON_MGBH: 'bt-7',
  BUTTON_MGUBI: 'bt-8',
  BUTTON_MGCONT: 'bt-9',
  BUTTON_MGJF: 'bt-10',
  BUTTON_MGMC: 'bt-11',
  BUTTON_CPSP: 'bt-12',
  BUTTON_CPBSB: 'bt-13',
  BUTTON_CPPA: 'bt-14',
  BUTTON_CPRJ: 'bt-15',
  BUTTON_CPFO: 'bt-16',
  BUTTON_BHCR: 'bt-17',
  BUTTON_BHCE: 'bt-18',
  BUTTON_BHSA: 'bt-19',
  BUTTON_BHCN: 'bt-20',
  BUTTON_BHAN: 'bt-21',
};

const bot = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

//Mensagen home
bot.on(Events.MessageCreate, (message) => {
  if (message.content.startsWith('!home')) {
    const homeEmbed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setDescription(
        '``👋`` Boas vindas ao servidor exclusivo para torcedores do Cruzeiro Esporte Clube. Sinta-se a vontade para trocar ideia com outros torcedores, acompanhar nossas partidas e participar de interações!\n\n``👤`` Sendo um sócio torcedor do Cruzeiro você receberá acesso á #Arquibancada-VIP, uma área exclusiva onde teremos perguntas e watch-partys exclusivas com seus ídolos e afins. Acesse o canal  <#1040356717545930752> para entrar em sua conta.\n\n``📬``No canal <#1040356889352998952> , sinta-se a vontade para auto-atribuir funções de notificações das modalidades que desejar ser notificado.\n\n ``🌎`` Participe de uma área exclusiva de cruzeirensses de onde você mora clicando no ``Sua Região``!'
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/1040357924133949501/1062822427224195194/boasvindascruzeiro.png'
      );
    const actionHome = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.BUTTON_RULES)
        .setLabel('Regras')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.BUTTON_REGION)
        .setLabel('Sua Região')
        .setStyle(ButtonStyle.Secondary)
    );

    // mensagem de home
    return message.reply({
      components: [actionHome],
      embeds: [homeEmbed],
    });
  }
});

//Evento que recebe, quando a pessoa clica no botão, interage com select ou executa um slash command
bot.on(Events.InteractionCreate, (interaction) => {
  // console.log(interaction);

  const isButton =
    interaction.type === InteractionType.MessageComponent &&
    interaction.componentType === ComponentType.Button;

  // ir para regras
  if (isButton && interaction.customId === INTERACTION_IDS.BUTTON_RULES) {
    const ruleEmbed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(
        '``1`` Não é permitido qualquer tipo de desrespeito, preconceito e toxicidade entre os membros.\n\n``2`` Evite enviar links, mídias e outros conteúdos que fogem do tópico de cada canal.\n\n``3`` Não é permitido enviar mensagens repetidas de forma que polua o chat e atrapalhe a comunicação. Como por exemplo: spam, flood, e entre outros.\n\n``4`` Não permitimos material sexualmente explícito ou nudez. Também não permitimos conteúdos que encaminhem o tráfego a sites comerciais de pornografia.'
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/1065023880042909829/1066101388003774474/regrascruzeiro.png'
      );
    const row = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.BUTTON_OK)
        .setLabel('Concordo')
        .setStyle(ButtonStyle.Success)
    );

    interaction.reply({
      ephemeral: true,
      embeds: [ruleEmbed],
      components: [row],
    });
  }
});

// Mensagem pós botão concordo em Regras
bot.on(Events.InteractionCreate, (interaction) => {
  // console.log(interaction);

  if (
    interaction.type === InteractionType.MessageComponent &&
    interaction.componentType === ComponentType.Button &&
    interaction.customId === INTERACTION_IDS.BUTTON_OK
  ) {
    interaction.reply({
      ephemeral: true,
      content: 'Obrigado por entrar em nosso servidor oficial do Cruzeiro!',
    });
  }
});

// Escolher a região
bot.on(Events.InteractionCreate, (interaction) => {
  const EmbedRe = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(':earth_americas: Escolha sua Região')
    .setDescription(
      'Clique no botão que corresponde a sua região e participe de um área exclusiva no servidor com torcedores da onde você mora!'
    );
  const actionsRe = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_REGIONMG)
      .setLabel('Minas Gerais')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_REGIONCP)
      .setLabel('Outras Capitais')
      .setStyle(ButtonStyle.Secondary)
  );

  if (
    interaction.type === InteractionType.MessageComponent &&
    interaction.componentType === ComponentType.Button &&
    interaction.customId === INTERACTION_IDS.BUTTON_REGION
  ) {
    interaction.reply({
      ephemeral: true,
      embeds: [EmbedRe],
      components: [actionsRe],
    });
  }
});

// Mensagem de Minas Gerais
bot.on(Events.InteractionCreate, (interaction) => {
  const embedBH = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(':earth_americas: Escolha sua Região')
    .setDescription(
      'Então você mora na raiz do nosso time! Selecione abaixo se houver a opção da sua cidade. Se não houver a sua cidade, não se preocupe! É só enviar uma mensagem pedindo para adicionar sua cidade no <#1040370984613584959> que um dos moderadores irá criar para você!'
    );
  const actionsMG = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_MGBH)
      .setLabel('Belo Horizonte')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_MGUBI)
      .setLabel('Ubêrlandia')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_MGCONT)
      .setLabel('Contagem')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_MGJF)
      .setLabel('Juíz de Fora')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_MGMC)
      .setLabel('Montes Claros')
      .setStyle(ButtonStyle.Primary)
  );

  if (
    interaction.type === InteractionType.MessageComponent &&
    interaction.componentType === ComponentType.Button &&
    interaction.customId === INTERACTION_IDS.BUTTON_REGIONMG
  ) {
    interaction.update({
      ephemeral: true,
      embeds: [embedBH],
      components: [actionsMG],
    });
  }
});

// Mensagem Capitais
bot.on(Events.InteractionCreate, (interaction) => {
  let BSB = '1067807185322651678';
  let FO = '1068218091860934706';
  let PA = '1067806993542291508';
  let RJ = '1067806988223922226';
  let SP = '1067806937984536627';

  const embedCP = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(':earth_americas: Escolha sua capital')
    .setDescription(
      'Selecione abaixo se houver a opção da sua cidade. Se não houver a sua cidade, não se preocupe! É só enviar uma mensagem pedindo para adicionar sua cidade no <#1040370984613584959> que um dos moderadores irá criar para você!'
    );
  const actionsCP = new ActionRowBuilder().setComponents(
    new StringSelectMenuBuilder()
      .setPlaceholder('Selecione sua cidade')
      .setCustomId(INTERACTION_IDS.BUTTON_REGIONCPS)
      .setMaxValues(1)
      .addOptions(
        {
          label: 'São Paulo',
          description: 'Moro na capital de São Paulo',
          value: 'first_option',
        },
        {
          label: 'Brasília',
          description: 'Moro na capital de Goiais',
          value: 'second_option',
        },
        {
          label: 'Rio de Janeiro',
          description: 'Moro na capital de Rio de Janeiro',
          value: 'third_option',
        },
        {
          label: 'Porto Alegre',
          description: 'Moro na capital de Rio Grande do Sul',
          value: 'fourth_option',
        },
        {
          label: 'Fortaleza',
          description: 'Moro na capital de Ceará',
          value: 'fifth_option',
        }
      )
  );

  if (
    interaction.isStringSelectMenu(actionsCP) &&
    interaction.customId === INTERACTION_IDS.BUTTON_REGIONCPS
  ) {
    let ticket = interaction.values[0];

    if (ticket === 'Brasília') {
      membro.roles.add(BSB);
    }

    if (ticket === 'Fortaleza') {
      membro.roles.add(FO);
    }

    if (ticket === 'Porto Alegre') {
      membro.roles.add(PA);
    }

    if (ticket === 'Rio de Janeiro') {
      membro.roles.add(RJ);
    }

    if (ticket === 'São Paulo') {
      membro.roles.add(SP);
    }
  }

  if (
    interaction.type === InteractionType.MessageComponent &&
    interaction.componentType === ComponentType.Button &&
    interaction.customId === INTERACTION_IDS.BUTTON_REGIONCP
  ) {
    interaction.update({
      ephemeral: true,
      embeds: [embedCP],
      components: [actionsCP],
    });
  }
});

// Mensagem do select São Paulo
// Mensagem do select Rio de Janeiro
// Mensagem do select Brasília
// Mensagem do select Porto Alegre
// Mensagem do select Fortaleza

// Mensagem do botão "Belo Horizonte"
bot.on(Events.InteractionCreate, (interaction) => {
  const embedBHB = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(':homes: Escolha o seu Bairro')
    .setDescription(
      'Escolha o seu bairro clicando nos botões abaixo, e caso ele não esteja, não esquenta, é só pedir para criar uma área para ele mandando mensagem no <#1040370984613584959>'
    );
  const actionsBH = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_BHAN)
      .setLabel('Anchieta')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_BHCE)
      .setLabel('Centro')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_BHCN)
      .setLabel('Cidade Nova')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_BHCR)
      .setLabel('Cruzeiro')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.BUTTON_BHSA)
      .setLabel('Savassi')
      .setStyle(ButtonStyle.Primary)
  );

  if (
    interaction.type === InteractionType.MessageComponent &&
    interaction.componentType === ComponentType.Button &&
    interaction.customId === INTERACTION_IDS.BUTTON_MGBH
  ) {
    interaction.update({
      ephemeral: true,
      embeds: [embedBHB],
      components: [actionsBH],
    });
  }
});

bot.on(Events.ClientReady, () => {
  console.log('bot ligou!', bot.user.username);
});

// Log in to Discord with your client's token
bot.login(process.env.TOKEN);
