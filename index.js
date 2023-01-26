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
  OK_BUTTON: 'btn-1',
  BUTTON_RULES: 'btn-2',
  REGION_BUTTON: 'bt-3',
  CAPITIES_SELECT_MENU: 'bt-4',
  MG_REGION_BUTTON: 'bt-5',
  CAPITIES_BUTTON: 'bt-6',
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

const stateOptions = [
  {
    label: 'São Paulo',
    description: 'Moro na capital de São Paulo',
    value: 'SP',
    roleId: '1067806937984536627',
  },
  {
    label: 'Brasília',
    description: 'Moro na capital de Goiais',
    value: 'BSB',
    roleId: '1067807185322651678',
  },
  {
    label: 'Rio de Janeiro',
    description: 'Moro na capital de Rio de Janeiro',
    value: 'RJ',
    roleId: '1067806988223922226',
  },
  {
    label: 'Porto Alegre',
    description: 'Moro na capital de Rio Grande do Sul',
    value: 'PA',
    roleId: '1067806993542291508',
  },
  {
    roleId: '1068218091860934706',

    label: 'Fortaleza',
    description: 'Moro na capital de Ceará',
    value: 'FO',
  },
];

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
        .setCustomId(INTERACTION_IDS.REGION_BUTTON)
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
bot.on(Events.InteractionCreate, async (interaction) => {
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
        .setCustomId(INTERACTION_IDS.OK_BUTTON)
        .setLabel('Concordo')
        .setStyle(ButtonStyle.Success)
    );

    interaction.reply({
      ephemeral: true,
      embeds: [ruleEmbed],
      components: [row],
    });
  } else if (isButton && interaction.customId === INTERACTION_IDS.OK_BUTTON) {
    interaction.reply({
      ephemeral: true,
      content: 'Obrigado por entrar em nosso servidor oficial do Cruzeiro!',
    });
  } else if (
    isButton &&
    interaction.customId === INTERACTION_IDS.REGION_BUTTON
  ) {
    const regionEmbed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':earth_americas: Escolha sua Região')
      .setDescription(
        'Clique no botão que corresponde a sua região e participe de um área exclusiva no servidor com torcedores da onde você mora!'
      );
    const components = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.MG_REGION_BUTTON)
        .setLabel('Minas Gerais')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.CAPITIES_BUTTON)
        .setLabel('Outras Capitais')
        .setStyle(ButtonStyle.Secondary)
    );

    interaction.reply({
      ephemeral: true,
      embeds: [regionEmbed],
      components: [components],
    });
  } else if (
    isButton &&
    interaction.customId === INTERACTION_IDS.MG_REGION_BUTTON
  ) {
    const mgEmbed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':earth_americas: Escolha sua Região')
      .setDescription(
        'Então você mora na raiz do nosso time! Selecione abaixo se houver a opção da sua cidade. Se não houver a sua cidade, não se preocupe! É só enviar uma mensagem pedindo para adicionar sua cidade no <#1040370984613584959> que um dos moderadores irá criar para você!'
      );

    const mgCities = [
      { buttonId: INTERACTION_IDS.BUTTON_MGBH, name: 'Belo Horizonte' },
      { buttonId: INTERACTION_IDS.BUTTON_MGUBI, name: 'Ubêrlandia' },
      { buttonId: INTERACTION_IDS.BUTTON_MGCONT, name: 'Contagem' },
      { buttonId: INTERACTION_IDS.BUTTON_MGJF, name: 'Juíz de Fora' },
      { buttonId: INTERACTION_IDS.BUTTON_MGMC, name: 'Montes Claros' },
    ];

    const components = new ActionRowBuilder().setComponents(
      mgCities.map((city) =>
        new ButtonBuilder()
          .setCustomId(city.buttonId)
          .setLabel(city.name)
          .setStyle(ButtonStyle.Primary)
      )
    );

    interaction.update({
      ephemeral: true,
      embeds: [mgEmbed],
      components: [components],
    });
  } else if (
    interaction.isStringSelectMenu() &&
    interaction.customId === INTERACTION_IDS.CAPITIES_SELECT_MENU
  ) {
    const valueOption = interaction.values[0];
    const state = stateOptions.find(
      (stateOption) => stateOption.value === valueOption
    );

    if (!state) {
      return console.error(
        'state selecionado não foi achado e eu implementei a mensagem para esse caso.'
      );
    }

    await interaction.deferReply({ ephemeral: true });
    await interaction.member.roles.add(state.roleId);
    await interaction.editReply(`Cargo de ${state.label} adicionado!`);
  } else if (
    isButton &&
    interaction.customId === INTERACTION_IDS.CAPITIES_BUTTON
  ) {
    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':earth_americas: Escolha sua capital')
      .setDescription(
        'Selecione abaixo se houver a opção da sua cidade. Se não houver a sua cidade, não se preocupe! É só enviar uma mensagem pedindo para adicionar sua cidade no <#1040370984613584959> que um dos moderadores irá criar para você!'
      );

    const components = new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder()
        .setPlaceholder('Selecione sua cidade')
        .setCustomId(INTERACTION_IDS.CAPITIES_SELECT_MENU)
        .setMaxValues(1)
        .addOptions(
          stateOptions.map((stateOption) => ({
            label: stateOption.label,
            description: stateOption.description,
            value: stateOption.value,
          }))
        )
    );

    interaction.update({
      ephemeral: true,
      embeds: [embed],
      components: [components],
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
