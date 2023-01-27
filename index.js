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

const MG_STATE = 'MG';

// Ids dos botões
const { INTERACTION_IDS } = require('./constants');
const { updateInteractionWithMgCitiesSelect } = require('./mg-interactions');
const capitiesOptions = require('./data/capities.json');
const mgCitiesOptions = require('./data/mg-cities.json');

const districtOptions = [
  {
    label: 'Anchieta',
    value: 'Anchieta',
    roleId: '1068221442447122582',
    customId: INTERACTION_IDS.SELECT_BHAN,
  },
  {
    label: 'Centro',
    value: 'Centro',
    roleId: '1068218752254095440',
    customId: INTERACTION_IDS.SELECT_BHCE,
  },
  {
    label: 'Cidade Nova',
    value: 'Cidade Nova',
    roleId: '1067817946476449862',
    customId: INTERACTION_IDS.SELECT_BHCN,
  },
  {
    label: 'Cruzeiro',
    value: 'Cruzeiro',
    roleId: '1067817892005019710',
    customId: INTERACTION_IDS.SELECT_BHCR,
  },
  {
    label: 'Savassi',
    value: 'Savassi',
    roleId: '1068221490832617492',
    customId: INTERACTION_IDS.SELECT_BHSA,
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
        '``👋`` Boas vindas ao servidor exclusivo para torcedores do Cruzeiro Esporte Clube. Sinta-se a vontade para trocar ideia com outros torcedores, acompanhar nossas partidas e participar de interações!\n\n``👤`` Sendo um sócio torcedor do Cruzeiro você receberá acesso á #Arquibancada-VIP, uma área exclusiva onde teremos perguntas e watch-partys exclusivas com seus ídolos e afins. Acesse o canal  <#1040356717545930752> para entrar em sua conta.\n\n``📬``No canal <#1040356889352998952> , sinta-se a vontade para auto-atribuir funções de notificações das modalidades que desejar ser notificado.\n\n ``🌎`` **Participe de uma área exclusiva de cruzeirensses de onde você mora clicando no** ``Sua Região``!'
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

  if (interaction.customId.startsWith(INTERACTION_IDS.MG_REGION_SELECT)) {
    const [_prefix, stateId, cityId] = interaction.customId.split(':'); // ["select-role", "{state}", "{?city}"]

    if (stateId === MG_STATE) {
      const city = cityId
        ? mgCitiesOptions.find((mgCity) => mgCity.value)
        : null;

      if (!city) {
        return updateInteractionWithMgCitiesSelect(interaction);
      }
    }
  }

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
    const links =
      'https://discord.com/channels/1040355324374306957/1040356717545930752';
    // interação de concordo
    const components = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setLabel('Faça seu login')
        .setStyle(ButtonStyle.Link)
        .setURL(links)
    );

    interaction.reply({
      ephemeral: true,
      content:
        'Obrigado por entrar em nosso servidor oficial do Cruzeiro!\n> **E não esqueça de fazer seu login caso seja socio torcedor!**',
      components: [components],
    });
  } else if (
    isButton &&
    interaction.customId === INTERACTION_IDS.REGION_BUTTON
  ) {
    // Ação de escolher sua região com opção de minas gerais ou outras capitais
    const regionEmbed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':earth_americas: Escolha sua Região')
      .setDescription(
        'Clique no botão que corresponde a sua região e participe de um área exclusiva no servidor com torcedores da onde você mora!'
      );
    const components = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.MG_REGION_SELECT + ':' + MG_STATE)
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
    interaction.customId === INTERACTION_IDS.CAPITIES_BUTTON
  ) {
    // capital
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
          capitiesOptions.map((stateOption) => ({
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
  } else if (
    interaction.isStringSelectMenu() &&
    interaction.customId === INTERACTION_IDS.CAPITIES_SELECT_MENU
  ) {
    // interação pós escolher a capital
    const valueOption = interaction.values[0];
    const state = capitiesOptions.find(
      (stateOption) => stateOption.value === valueOption
    );

    if (!state) {
      return console.error(
        'state selecionado não foi achado e eu implementei a mensagem para esse caso.'
      );
    }

    await interaction.deferReply({ ephemeral: true });
    await interaction.member.roles.add(state.roleId);
    await interaction.editReply(
      `A área da cidade ${state.label} foi adicionada para você!`
    );
  } else if (
    isButton &&
    interaction.customId === INTERACTION_IDS.MG_REGION_BUTTON
  ) {
    // interação quando é escolhido minas gerais
    const mgEmbed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':earth_americas: Escolha sua Região')
      .setDescription(
        'Então você mora na raiz do nosso time! Selecione abaixo se houver a opção da sua cidade. Se não houver a sua cidade, não se preocupe! É só enviar uma mensagem pedindo para adicionar sua cidade no <#1040370984613584959> que um dos moderadores irá criar para você!'
      );

    const components = new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder()
        .setPlaceholder('Selecione sua cidade')
        .setCustomId(INTERACTION_IDS.CITIES_SELECT_MENU)
        .addOptions(
          mgCitiesOptions.map((cityOptions) => ({
            label: cityOptions.label,
            description: cityOptions.description,
            value: cityOptions.value,
          }))
        )
    );

    interaction.update({
      ephemeral: true,
      embeds: [mgEmbed],
      components: [components],
    });
  } else if (
    interaction.isStringSelectMenu() &&
    interaction.customId === INTERACTION_IDS.CITIES_SELECT_MENU
  ) {
    // interação pós escolher a cidade de MInas Gerais
    const valueOption = interaction.values[0];
    const city = mgCitiesOptions.find(
      (cityOption) => cityOption.value === valueOption
    );

    if (!city) {
      return console.error(
        'city selecionado não foi achado e eu implementei a mensagem para esse caso.'
      );
    } else if (city.customId != INTERACTION_IDS.SELECT_MGBH) {
      // interaction.customId = CITIES_SELECT_MENU
      await interaction.deferReply({ ephemeral: true });
      await interaction.member.roles.add(city.roleId);
      await interaction.editReply(
        `A área da cidade ${city.label} foi adicionada para você!`
      );
    }
  } else if (
    interaction.isStringSelectMenu() &&
    interaction.customId === INTERACTION_IDS.SELECT_MGBH
  ) {
    // Mensagem do botão "Belo Horizonte"
    const embedBHB = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':homes: Escolha o seu Bairro')
      .setDescription(
        'Escolha o seu bairro clicando nos botões abaixo, e caso ele não esteja, não esquenta, é só pedir para criar uma área para ele mandando mensagem no <#1040370984613584959>'
      );
    const actionsBH = new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder()
        .setPlaceholder('Selecione seu bairro')
        .setCustomId(INTERACTION_IDS.DISTRICT_SELECT_MENU)
        .setMaxValues(1)
        .addOptions(
          districtOptions.map((districtOption) => ({
            label: districtOption.label,
            value: districtOption.value,
            customId: districtOption.customId,
          }))
        )
    );

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
