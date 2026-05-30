from PIL import Image
import os

# Cria uma pasta nova chamada "fotos_leves" para não estragar as suas originais
os.makedirs("fotos_leves", exist_ok=True)

print("Começando a dieta das fotos... ⏳")

# Pega todos os arquivos que estão na pasta
arquivos_na_pasta = os.listdir()

for arquivo in arquivos_na_pasta:
    # Verifica se o arquivo é uma imagem
    if arquivo.lower().endswith(('.png', '.jpg', '.jpeg')):
        try:
            # Abre a foto pesada
            imagem = Image.open(arquivo)
            
            # Se for PNG, converte para o formato padrão para aceitar compressão
            if imagem.mode in ("RGBA", "P"):
                imagem = imagem.convert("RGB")
            
            # Padroniza o nome para terminar sempre com .jpg
            novo_nome = arquivo.lower().replace('.png', '.jpg').replace('.jpeg', '.jpg')
            caminho_para_salvar = f"fotos_leves/{novo_nome}"
            
            # O SEGREDO ESTÁ AQUI: quality=30 comprime a imagem mantendo a essência
            imagem.save(caminho_para_salvar, "JPEG", optimize=True, quality=30)
            
            print(f"✅ {arquivo} comprimida com sucesso!")
        except Exception as e:
            print(f"❌ Erro na {arquivo}: {e}")

print("Tudo pronto! Pegue suas fotos novas na pasta 'fotos_leves'! 🎉")