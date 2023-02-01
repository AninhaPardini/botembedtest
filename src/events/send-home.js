const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('@discordjs/builders');
const { ButtonStyle } = require('discord.js');
const { INTERACTION_IDS } = require('../constants');

/**
 * Send a message to the user that write !home them to the server.
 * @param {Message} message - The message that triggered the command.
 * @returns Embed message
 */
const sendHome = (message) => {
  if (message.content.startsWith('!home')) {
    const homeEmbed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setDescription(
        '``👋`` Boas vindas ao servidor exclusivo para torcedores do **Cruzeiro Esporte Clube**. Sinta-se a vontade para trocar ideia com outros torcedores, acompanhar nossas partidas e participar de interações!\n\n``👤`` Sendo um **sócio torcedor** do **Cruzeiro** você receberá acesso á #Arquibancada-VIP, uma área **exclusiva** onde teremos perguntas e **watch-partys exclusivas** com seus ídolos além de sorteios e muito mais! *Acesse o canal  <#1040356717545930752> para entrar em sua conta*.\n\n``📬``No canal <#1040356889352998952> , sinta-se a vontade para auto-atribuir funções de **notificações** das modalidades que desejar ser notificado.\n\n ``🌎`` **Participe de uma área exclusiva de cruzeirensses de onde você mora clicando no** ``Sua Região``!'
      )
      .setImage(
        'https://media.discordapp.net/attachments/1040358106724581477/1062820729239904437/boasvindascruzeiro.png'
      );
    const actionHome = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.REGION_BUTTON)
        .setLabel('Sua Região')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.SPORT_BUTTON)
        .setLabel('Notificações')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(INTERACTION_IDS.LOGIN_BUTTON)
        .setLabel('Faça Login')
        .setStyle(ButtonStyle.Secondary)
    );

    return message.channel.send({
      components: [actionHome],
      embeds: [homeEmbed],
    });
  }
};

module.exports = { sendHome };
