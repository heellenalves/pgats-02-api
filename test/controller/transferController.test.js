// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicações
const app = require('../../app');

// Mock
const transferService = require ('../../services/transferService')

//Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            const resposta = await request (app)
                .post('/api/transfers')
                .send({
                    "from": "julio",
                    "to": "priscila",
                    "amount": 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        });


        it('Usando Mocks - Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            //Mockar apenas a função transfer do service
            const transferServiceMock = sinon.stub(transferService, 'createTransfer')
            transferServiceMock.throws(new Error('Usuário não encontrado'))
            
            const resposta = await request (app)
                .post('/api/transfers')
                .send({
                    "from": "julio",
                    "to": "priscila",
                    "amount": 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

            // Reseto o Mock
            sinon.restore();
        });

        it('Usando Mocks - Quando informo valores válidos recebo 201', async () => {
            // Preparando os dados
                // Carregar o arquivo
                    // Preparar a forma de ignorar os campos dinâmicos
            
            //Mockar apenas a função transfer do service
            const transferServiceMock = sinon.stub(transferService, 'createTransfer')
            transferServiceMock.returns({ 
                from: "julio", 
                to: "priscila", 
                amount: 100, 
                date: new Date 
            })
            
            const resposta = await request (app)
                .post('/api/transfers')
                .send({
                    "from": "julio",
                    "to": "priscila",
                    "amount": 100
                });

            expect(resposta.status).to.equal(201);

            //Validação com um fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosTenhoSucessoCom201.json')
            delete resposta.body.date;
            delete respostaEsperada.date;
            expect(resposta.body).to.deep.equal(respostaEsperada);

            // Um expect para comparar a Resposta.body com a String contida no arquivo
            //expect(resposta.body).to.have.property('from', 'julio')
            //expect(resposta.body).to.have.property('to', 'priscila')
            //expect(resposta.body).to.have.property('amount', 100)


            // Reseto o Mock
            sinon.restore();
        });
    });

    describe('GET /transfers', () => {
        //its ficam aqui
       });
    });