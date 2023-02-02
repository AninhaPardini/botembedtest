const capitalsOptions = require('../data/capitals.json');
const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { INTERACTION_IDS } = require('../constants');

const updateInteractionWithCapitalsButton = (interaction) => {
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
        capitalsOptions.map((stateOption) => ({
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
};

module.exports = { updateInteractionWithCapitalsButton };
