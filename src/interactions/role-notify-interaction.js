const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require('@discordjs/builders');
const {} = require('discord.js');

const modalities = require('../data/modalities.json');

const updateInteractionWithModalitieSelect = async (interaction) => {
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
};

module.exports = { updateInteractionWithModalitieSelect };
