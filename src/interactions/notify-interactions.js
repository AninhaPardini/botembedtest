const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { INTERACTION_IDS } = require('../constants');
const modalities = require('../data/modalities.json');

const updateInteractionWithNotificationButton = (interaction) => {
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
      .setMinValues(1)
      .addOptions(
        modalities.map((modalityOptions) => ({
          label: modalityOptions.label,
          value: modalityOptions.value,
        }))
      )
  );

  return interaction.reply({
    ephemeral: true,
    embeds: [embed],
    components: [components],
  });
};

module.exports = { updateInteractionWithNotificationButton };
