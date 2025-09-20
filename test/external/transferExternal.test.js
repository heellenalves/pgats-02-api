// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

//Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatário inexistentes, recebo 400', async () => {

            // Capturar o token
            const respostaLogin = await request ('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    username: 'julio',
                    password: '123456'
                });

            const token = respostaLogin.body.token;

            // Realizar a transferência
            const resposta = await request ('http://localhost:3000')
                .post('/api/transfers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "from": "julio",
                    "to": "isa",
                    "amount": 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado.')
        });
    });
});