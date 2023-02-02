const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { INTERACTION_IDS, MG_STATE } = require('../constants');
const { ButtonStyle, EmbedBuilder } = require('discord.js');

const updateInteractionWithRegionButton = (interaction) => {
  const regionEmbed = new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(':earth_americas: Escolha sua Região')
    .setDescription(
      '**Clique no botão** que corresponde a sua **região** e participe de um área **exclusiva** no servidor com **torcedores** da onde você mora!'
    );
  const components = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.MG_REGION_SELECT + ':' + MG_STATE)
      .setLabel('Minas Gerais')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(INTERACTION_IDS.CAPITIES_BUTTON)
      .setLabel('Outras regiões')
      .setStyle(ButtonStyle.Secondary)
  );

  interaction.reply({
    ephemeral: true,
    embeds: [regionEmbed],
    components: [components],
  });
};
// Interação de escolher sua região com opção de minas gerais ou outras capitais
module.exports = { updateInteractionWithRegionButton };
