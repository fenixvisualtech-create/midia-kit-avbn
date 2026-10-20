# AVBN - revisão do site e mídia kit

## Aplicado
- Logos oficiais fornecidas no documento e CNPJ na capa.
- Histórico de mais de 4.000 alunas em 30 anos das Escolinhas, separado da fundação da AVBN em 2019.
- Contratação de 4 profissionais e 2 coordenadores, materiais de treino e novo núcleo.
- Mais de 200 alunas atualmente atendidas com aulas gratuitas; formação contínua dos 6 aos 18 anos.
- Nome Liga Voleibol Santa Catarina e textos sobre competições e representatividade.
- Contrapartidas: vídeo institucional, ações com a Escolinha, mídia digital e relatório oficial.
- Prestação de contas via Ministério do Esporte e Recibo de Financiador.
- QR Code da contabilidade: https://wa.me/554836584155.
- Melhorias de tipografia, leitura em celular e diagramação de impressão.
- Nove PDFs individuais A4 paisagem e um PDF completo de nove páginas.
- Bibliotecas JavaScript locais para manter galeria, ícones e geração de QR sem depender dos CDNs.

## Para fechar a impressão definitiva
1. Informar o endereço público do site em `config.js`, campo `siteUrl`.
2. Informar o link do vídeo publicado em `config.js`, campo `videoUrl`.
3. Gerar novamente os PDFs depois de preencher esses dois campos.

Os dois QR Codes pendentes estão identificados no material. Nenhum deles leva a um endereço inventado ou ao perfil do Instagram em lugar do vídeo. Ao publicar o site, o QR do simulador usa automaticamente o próprio endereço público; para gerar os PDFs localmente é necessário preencher `siteUrl`.

O link direto do simulador é o endereço público acrescido de `#simulador`.

O telefone institucional `(48) 99999-0000` e o e-mail foram mantidos conforme o briefing original; o telefone deve ser confirmado antes da publicação final. A contabilidade usa o número verificado no documento do cliente.

## Como abrir e gerar
Abra `index.html` no navegador ou execute `npm start` na pasta do site. Para gerar os PDFs, execute `npm install` e `npm run pdf`. O Chrome deve estar instalado; é possível indicar outro caminho pela variável `CHROME_PATH`. Os PDFs são gravados na pasta indicada por `PDF_OUTPUT_DIR` ou, por padrão, na pasta `PDFs` ao lado do site.

Este pacote contém os arquivos atualizados para substituir a versão existente na hospedagem. A hospedagem externa não foi alterada nesta revisão.

## Referências de redação fiscal
O percentual geral de 2% para empresas no Lucro Real em 2026/2027 foi conferido no Decreto nº 12.861/2026. A contabilidade deve confirmar a base elegível e o limite disponível de cada empresa. Não foram alterados o processo, o orçamento aprovado e os dados do projeto fornecidos pelo cliente.
https://www.gov.br/esporte/pt-br/noticias-e-conteudos/esporte/decreto-que-aprimora-a-lei-de-incentivo-ao-esporte-e-publicado
https://www.gov.br/esporte/pt-br/acoes-e-programas/lei-de-incentivo-ao-esporte/fases-do-projeto-2
