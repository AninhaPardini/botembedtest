const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require('@discordjs/builders');
const { INTERACTION_IDS, MG_STATE } = require('./constants');
const {
  GatewayIntentBits,
  Events,
  ButtonStyle,
  InteractionType,
  ComponentType,
  EmbedBuilder,
  MessageManager,
} = require('discord.js');

const mgCitiesOptions = require('./data/mg-cities.json');

const updateInteractionWithMgCitiesSelect = (interaction) => {
  const embed = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(':earth_americas: Escolha sua Região')
    .setDescription(
      'Então você mora na raiz do nosso time! Selecione abaixo se houver a opção da sua cidade. Se não houver a sua cidade, não se preocupe! É só enviar uma mensagem pedindo para adicionar sua cidade no <#1040370984613584959> que um dos moderadores irá criar para você!'
    );

  const components = new ActionRowBuilder().setComponents(
    new StringSelectMenuBuilder()
      .setPlaceholder('Selecione sua cidade')
      .setCustomId(INTERACTION_IDS.MG_REGION_SELECT + ':' + MG_STATE)
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
    embeds: [embed],
    components: [components],
  });
};

module.exports = { updateInteractionWithMgCitiesSelect };
