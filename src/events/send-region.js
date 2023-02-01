const { INTERACTION_IDS, MG_STATE } = require('../constants');
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('@discordjs/builders');
const { ButtonStyle } = require('discord.js');

const sendRegion = (message) => {
  if (message.content.startsWith('!regiao')) {
    const embed = new EmbedBuilder()
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
        .setLabel('Outras Capitais')
        .setStyle(ButtonStyle.Secondary)
    );

    return message.channel.send({
      components: [components],
      embeds: [embed],
    });
  }
};

module.exports = { sendRegion };
