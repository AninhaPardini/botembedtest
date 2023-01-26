const Discord = require('discord.js');

// O async ali indica que essa função vai usar assincronicidade (ou seja, vai esperar algo acontecer antes de continuar)
client.on('messageCreate', async (message) => {
  if (message.content === '!home') {
    // Aqui cria o embed
    const embed = new Discord.EmbedBuilder()
      .setColor(0x2f3136)
      .setTitle('Seu título')
      .setDescription(
        '``👋`` Boas vindas ao servidor exclusivo para torcedores do Cruzeiro Esporte Clube. Sinta-se a vontade para trocar ideia com outros torcedores, acompanhar nossas partidas e participar de interações!\n``👤`` Sendo um sócio torcedor do Cruzeiro você receberá acesso á #Arquibancada-VIP, uma área exclusiva onde teremos perguntas e watch-partys exclusivas com seus ídolos e afins. Acesse o canal <#1040356717545930752> para entrar em sua conta.\n``📬``No canal <#1040356889352998952> , sinta-se a vontade para auto-atribuir funções de notificações das modalidades que desejar ser notificado.'
      )
      .setFooter({ text: 'Seu footer, pode tirar essa linha se não for usar' });

    const buttonsActionRow = new Discord.ActionRowBuilder().setComponents(
      // Aqui você cria até 5 botões
      new Discord.ButtonBuilder()
        .setCustomId('Regras')
        .setLabel('Regras')
        .setStyle(Discord.ButtonStyle.Primary), // O estilo do botão, pode ser PRIMARY, SECONDARY, SUCCESS, DANGER, LINK
      new Discord.ButtonBuilder()
        .setCustomId('Sua Região')
        .setLabel('Sua Região')
        .setStyle(Discord.ButtonStyle.Secondary)
    );

    const regras = new Discord.EmbedBuilder()
      .setColor(0x0c5dc3)
      .setDescription(
        '``1``  Não é permitido qualquer tipo de desrespeito, preconceito e toxicidade entre os membros.\n``2`` Evite enviar links, mídias e outros conteúdos que fogem do tópico de cada canal.\n``3`` Não é permitido enviar mensagens repetidas de forma que polua o chat e atrapalhe a comunicação. Como por exemplo: spam, flood, e entre outros.\n``4`` Não permitimos material sexualmente explícito ou nudez. Também não permitimos conteúdos que encaminhem o tráfego a sites comerciais de pornografia.'
      );

    await message.channel.send({
      embeds: [embed],
      components: [buttonsActionRow],
    });
  }

  if (message.content === '!notify') {
    // Aqui cria o embed
    const embed = new Discord.EmbedBuilder()
      .setTitle('Seu título')
      .setDescription('Sua descrição')
      .setFooter({ text: 'Seu footer, pode tirar essa linha se não for usar' });

    const buttonsActionRow = new Discord.ActionRowBuilder().setComponents(
      // Aqui você cria até 5 botões
      new Discord.ButtonBuilder()
        .setCustomId('seu-id')
        .setLabel('2')
        .setStyle(Discord.ButtonStyle.Primary), // O estilo do botão, pode ser PRIMARY, SECONDARY, SUCCESS, DANGER, LINK
      new Discord.ButtonBuilder()
        .setCustomId('seu-outro-id')
        .setLabel('1')
        .setStyle(Discord.ButtonStyle.Secondary)
    );

    await message.channel.send({
      embeds: [embed],
      components: [buttonsActionRow],
    });
  }

  if (message.content === '!teste') {
    // Aqui cria o embed
    const embed = new Discord.EmbedBuilder()
      .setTitle('Seu título')
      .setDescription('Sua descrição')
      .setFooter({ text: 'Seu footer, pode tirar essa linha se não for usar' });

    const buttonsActionRow = new Discord.ActionRowBuilder().setComponents(
      // Aqui você cria até 5 botões
      new Discord.ButtonBuilder()
        .setCustomId('seu-id')
        .setLabel('2')
        .setStyle(Discord.ButtonStyle.Primary), // O estilo do botão, pode ser PRIMARY, SECONDARY, SUCCESS, DANGER, LINK
      new Discord.ButtonBuilder()
        .setCustomId('seu-outro-id')
        .setLabel('1')
        .setStyle(Discord.ButtonStyle.Secondary)
    );

    await message.channel.send({
      embeds: [embed],
      components: [buttonsActionRow],
    });
  }

  if (message.content === '!agenda') {
    // Aqui cria o embed
    const embed = new Discord.EmbedBuilder()
      .setTitle('Seu título')
      .setDescription('Sua descrição')
      .setFooter({ text: 'Seu footer, pode tirar essa linha se não for usar' });

    const buttonsActionRow = new Discord.ActionRowBuilder().setComponents(
      // Aqui você cria até 5 botões
      new Discord.ButtonBuilder()
        .setCustomId('seu-id')
        .setLabel('2')
        .setStyle(Discord.ButtonStyle.Primary), // O estilo do botão, pode ser PRIMARY, SECONDARY, SUCCESS, DANGER, LINK
      new Discord.ButtonBuilder()
        .setCustomId('seu-outro-id')
        .setLabel('1')
        .setStyle(Discord.ButtonStyle.Secondary)
    );

    await message.channel.send({
      embeds: [embed],
      components: [buttonsActionRow],
    });
  }

  if (message.content === '!resultados') {
    // Aqui cria o embed
    const embed = new Discord.EmbedBuilder()
      .setTitle('Seu título')
      .setDescription('Sua descrição')
      .setFooter({ text: 'Seu footer, pode tirar essa linha se não for usar' });

    const buttonsActionRow = new Discord.ActionRowBuilder().setComponents(
      // Aqui você cria até 5 botões
      new Discord.ButtonBuilder()
        .setCustomId('seu-id')
        .setLabel('2')
        .setStyle(Discord.ButtonStyle.Primary), // O estilo do botão, pode ser PRIMARY, SECONDARY, SUCCESS, DANGER, LINK
      new Discord.ButtonBuilder()
        .setCustomId('seu-outro-id')
        .setLabel('1')
        .setStyle(Discord.ButtonStyle.Secondary)
    );

    await message.channel.send({
      embeds: [embed],
      components: [buttonsActionRow],
    });
  }

  /*
    o await é necessário para que o bot espere a mensagem ser enviada
    antes de continuar e realizar outra coisa, caso tenha mais código em baixo.
    */
  // Aqui envia a mensagem, nesse caso ,no mesmo canal em que você mandou o !home
});
