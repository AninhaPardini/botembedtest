const { INTERACTION_IDS } = require('../constants');
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('@discordjs/builders');
const { ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const modalities = require('../data/modalities.json');

/**
 * Send a notification to the user that they have been added to the notify list.
 * @param {Message} message - the message that triggered the notification
 * @returns Embed message
 */
const sendNotify = (message) => {
  if (message.content.startsWith('!notify')) {
    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle(':bell: Escolha sobre o que você gosta para ser notificado!')
      .setDescription(
        '**Selecione** a modalidade que corresponde ao **esporte** que você gosta de acompanhar do **nosso time** e fique por dentro de tudo que acontece!'
      );
    const components = new ActionRowBuilder().setComponents(
      new StringSelectMenuBuilder()
        .setPlaceholder('Selecione a modalidade')
        .setCustomId(INTERACTION_IDS.NOTIFY_SELECT_MENU)
        .addOptions(
          modalities.map((modalityOptions) => ({
            label: modalityOptions.label,
            value: modalityOptions.value,
          }))
        )
    );

    return message.channel.send({
      embeds: [embed],
      components: [components],
    });
  }
};

module.exports = { sendNotify };
