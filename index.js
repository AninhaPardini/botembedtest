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

// mensages
const { sendHome } = require('./src/events/send-home');
const { sendNotify } = require('./src/events/send-notify');
const { sendRegion } = require('./src/events/send-region');

// interaction
const {
  updateInteractionWithRegionButton,
} = require('./src/interactions/region-interaction');
const {
  updateInteractionWithNotificationButton,
} = require('./src/interactions/notify-interactions');

// Ids dos botões
const { INTERACTION_IDS, MG_STATE } = require('./src/constants');
const {
  updateInteractionWithMgCitiesSelect,
} = require('./src/interactions/mg-interactions');

// array de dados
const capitiesOptions = require('./src/data/capities.json');
const mgCitiesOptions = require('./src/data/mg-cities.json');
const modalities = require('./src/data/modalities.json');

const bot = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});

//Mensagem home
bot.on(Events.MessageCreate, (message) => {
  sendHome(message);
  sendRegion(message);
  sendNotify(message);
});

//Evento que recebe, quando a pessoa clica no botão, interage com select ou executa um slash command
bot.on(Events.InteractionCreate, async (interaction) => {
  const isButton =
    interaction.type === InteractionType.MessageComponent &&
    interaction.componentType === ComponentType.Button;

  if (interaction.customId.startsWith(INTERACTION_IDS.MG_REGION_SELECT)) {
    const [_prefix, stateId, cityId] = interaction.customId.split(':'); // ["select-role", "{state}", "{?city}"]

    if (stateId === MG_STATE) {
      const city = cityId
        ? mgCitiesOptions.find((mgCity) => mgCity.value === cityId)
        : null;

      const shouldShowCitySelect = !city && interaction.isButton();

      if (shouldShowCitySelect) {
        return updateInteractionWithMgCitiesSelect(interaction);
      }

      const selectedCityInSelect = !city && interaction.isStringSelectMenu();

      if (selectedCityInSelect) {
        const selectedValue = interaction.values[0];
        const selectedCity = selectedValue
          ? mgCitiesOptions.find((city) => city.value === selectedValue)
          : null;

        if (!selectedCity) {
          return updateInteractionWithMgCitiesSelect(interaction);
        }

        await interaction.deferUpdate({ ephemeral: true });
        await interaction.member.roles.add(selectedCity.roleId);

        const showNeighborhoodsSelect =
          selectedCity.neighborhoods && selectedCity.neighborhoods.length > 0;

        if (showNeighborhoodsSelect) {
          const embed = new EmbedBuilder()
            .setColor(0x2f3136)
            .setTitle(':homes: Escolha o seu Bairro')
            .setDescription(
              '**Escolha** o seu bairro clicando nos **botões** abaixo!\n\n*Caso ele não esteja, não esquenta, é só pedir para criar uma área para ele mandando mensagem no <#1040370984613584959>*'
            );

          const selectId =
            INTERACTION_IDS.MG_REGION_SELECT +
            ':' +
            MG_STATE +
            ':' +
            selectedCity.value;

          const components = new ActionRowBuilder().setComponents(
            new StringSelectMenuBuilder()
              .setPlaceholder('Selecione seu bairro')
              .setCustomId(selectId)
              .setMaxValues(1)
              .addOptions(
                selectedCity.neighborhoods.map((districtOption) => ({
                  label: districtOption.label,
                  value: districtOption.value,
                  customId: districtOption.customId,
                }))
              )
          );

          return interaction.editReply({
            content: `:white_check_mark: A área da cidade ${selectedCity.label} foi adicionada para você!`,

            embeds: [embed],
            components: [components],
          });
        }

        return await interaction.editReply({
          content: `:white_check_mark: A área da cidade ${selectedCity.label} foi adicionada para você!`,
          embeds: [],
          components: [],
        });
      }

      const isNeighborhoodSelect =
        city.neighborhoods &&
        city.neighborhoods.length > 0 &&
        interaction.isStringSelectMenu();

      if (isNeighborhoodSelect) {
        const selectedValue = interaction.values[0];

        const selectedNeighborhood = city.neighborhoods.find(
          (neighborhood) => neighborhood.value === selectedValue
        );

        if (selectedNeighborhood) {
          await interaction.deferUpdate({ ephemeral: true });
          await interaction.member.roles.add(selectedNeighborhood.roleId);
          return await interaction.editReply({
            content: `:white_check_mark: A área do bairro ${selectedNeighborhood.label} foi adicionada para você!`,
            embeds: [],
            components: [],
          });
        }
      }
    }
  }

  if (isButton && interaction.customId === INTERACTION_IDS.REGION_BUTTON) {
    // Interação de escolher sua região com opção de minas gerais ou outras capitais
    updateInteractionWithRegionButton(interaction);
  } else if (
    isButton &&
    interaction.customId === INTERACTION_IDS.SPORT_BUTTON
  ) {
    updateInteractionWithNotificationButton(interaction);
  } else if (
    interaction.isStringSelectMenu() &&
    interaction.customId === INTERACTION_IDS.NOTIFY_SELECT_MENU
  ) {
    const valueOption = interaction.values[0];
    const modality = modalities.find(
      (modalityOptions) => modalityOptions.value === valueOption
    );

    if (!modality) {
      return console.error(
        'modality selecionado não foi achado e eu implementei a mensagem para esse caso.'
      );
    }

    await interaction.deferReply({ ephemeral: true });
    await interaction.member.roles.add(modality.roleId);
    await interaction.editReply(
      `:white_check_mark: A notificação do esporte ${modality.label} foi adicionado para você!`
    );
  } else if (
    isButton &&
    interaction.customId === INTERACTION_IDS.CAPITIES_BUTTON
  ) {
    // interação capital
    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':earth_americas: Escolha sua capital')
      .setDescription(
        '**Selecione abaixo** se houver a opção da sua **cidade**.\n\n  *Se não houver a sua cidade, não se preocupe! É só enviar uma mensagem pedindo para adicionar sua cidade no <#1040370984613584959> que um dos moderadores irá criar para você!*'
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

    interaction.reply({
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
      `:white_check_mark: A área da cidade ${state.label} foi adicionada para você!`
    );
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
        `:white_check_mark: A área da cidade ${city.label} foi adicionada para você!`
      );
    }
  }
});

bot.on(Events.ClientReady, () => {
  console.log('bot ligou!', bot.user.username);
});

// Log in to Discord with your client's token
bot.login(process.env.TOKEN);
