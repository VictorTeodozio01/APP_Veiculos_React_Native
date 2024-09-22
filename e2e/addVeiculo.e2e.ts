const { device, element, by, expect: detoxExpect } = require('detox');

describe('Add Veiculo Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should add a new Veiculo', async () => {
    await element(by.id('addVeiculoButton')).tap(); // Verifica se o botão de adicionar veículo é pressionado
    await element(by.id('placaInput')).typeText('ABC-1234'); // Digita a placa
    await element(by.id('modeloInput')).typeText('Civic'); // Digita o modelo
    await element(by.id('anoInput')).typeText('2022'); // Digita o ano
    await element(by.id('saveButton')).tap(); // Pressiona o botão de salvar

    // Aguarda a visibilidade do veículo adicionado
    await detoxExpect(element(by.text('ABC-1234'))).toBeVisible();
  });
});
