/* ============================================================
   AstraBuilds — BUILD LİSTESİ

   YENİ BİR BUILD EKLEMEK İÇİN:
   1) Aşağıdaki BUILDS dizisinin İÇİNE, en alttaki son build'den
      hemen sonra yeni bir { ... } bloğu ekle (bir öncekinin
      sonundaki virgülü unutma).
   2) En kolayı: mevcut bir bloğu kopyala, yapıştır, içindeki
      yazıları kendi build'inle değiştir.
   3) Dosyayı kaydet. Başka hiçbir şeye dokunmana gerek yok —
      site otomatik olarak yeni build'i kartlara ve filtrelere
      ekleyecek.

   ALAN AÇIKLAMALARI:
   - id            : Sadece harf/rakam/tire kullan, boşluk yok.
                      Başka hiçbir build ile AYNI olmamalı.
   - name          : Kartta büyük başlık olarak görünen isim.
   - tier          : Kategori etiketi (ör. "Bütçe", "Orta Seviye",
                      "Üst Düzey", "İçerik Üretimi"). İstediğin
                      yeni bir kategori adı yazabilirsin, filtre
                      butonları buna göre kendiliğinden oluşur.
   - tagline       : Kartta başlığın altında görünen tek cümlelik
                      kısa açıklama.
   - estimatedPrice: Tahmini toplam fiyat (bilgi amaçlı, satış
                      değildir). İstemiyorsan "" (boş) bırakabilirsin.
   - parts         : Parça listesi. { label, value } şeklinde
                      istediğin kadar satır ekleyip çıkarabilirsin.
   - description   : Build'in ne için uygun olduğunu anlatan
                      paragraf (ortada gösterilir).
   - pcPartPickerUrl: PCPartPicker liste linki (en altta buton
                      olarak gösterilir).
   ============================================================ */

const BUILDS = [
  {
    id: "budget-1440p",
    name: "Bütçe Dostu 1440p Oyun Bilgisayarı",
    tier: "Bütçe",
    tagline: "Yüksek ayarlarda 1440p oyun oynamak isteyenler için en makul giriş noktası.",
    estimatedPrice: "~28.000 ₺",
    parts: [
      { label: "İşlemci", value: "AMD Ryzen 5 7600" },
      { label: "Ekran Kartı", value: "NVIDIA RTX 4060 8GB" },
      { label: "Anakart", value: "MSI B650M PRO-A" },
      { label: "RAM", value: "32GB (2x16GB) DDR5 6000MHz" },
      { label: "Depolama", value: "1TB NVMe SSD (Gen4)" },
      { label: "Güç Kaynağı", value: "650W 80+ Bronze" },
      { label: "Kasa", value: "Orta kule, 3 fan destekli" },
      { label: "İşlemci Soğutucu", value: "Stok soğutucu yeterli" }
    ],
    description:
      "Bu liste, bütçesi sınırlı ama 1440p çözünürlükte akıcı oynamak isteyen oyuncular için derlendi. Ryzen 5 7600 ve RTX 4060 ikilisi, güncel oyunların çoğunu yüksek ayarlarda 60+ FPS ile çalıştırabiliyor. İleride ekran kartını değiştirerek build'i kolayca güçlendirebilirsin.",
    pcPartPickerUrl: "https://pcpartpicker.com/list/"
  },
  {
    id: "mid-range-esports",
    name: "Orta Seviye Esor / Genel Kullanım",
    tier: "Orta Seviye",
    tagline: "Rekabetçi oyunlarda yüksek FPS ile genel kullanım arasında dengeli bir seçim.",
    estimatedPrice: "~42.000 ₺",
    parts: [
      { label: "İşlemci", value: "AMD Ryzen 7 7700" },
      { label: "Ekran Kartı", value: "NVIDIA RTX 4070 12GB" },
      { label: "Anakart", value: "ASUS TUF Gaming B650-PLUS" },
      { label: "RAM", value: "32GB (2x16GB) DDR5 6000MHz" },
      { label: "Depolama", value: "2TB NVMe SSD (Gen4)" },
      { label: "Güç Kaynağı", value: "750W 80+ Gold" },
      { label: "Kasa", value: "Orta kule, mesh ön panel" },
      { label: "İşlemci Soğutucu", value: "240mm AIO sıvı soğutma" }
    ],
    description:
      "Hem rekabetçi oyunlarda (CS2, Valorant gibi) yüksek FPS hem de AAA oyunlarda 1440p'de rahat performans isteyenler için hazırlandı. Ryzen 7 7700'ün çok çekirdekli gücü, yayın yaparken veya arka planda ağır uygulamalar çalışırken de sıkıntı yaşatmıyor.",
    pcPartPickerUrl: "https://pcpartpicker.com/list/"
  },
  {
    id: "high-end-4k",
    name: "Üst Düzey 4K Oyun Bilgisayarı",
    tier: "Üst Düzey",
    tagline: "4K çözünürlükte en yeni oyunları maksimum ayarlarda oynamak isteyenler için.",
    estimatedPrice: "~85.000 ₺",
    parts: [
      { label: "İşlemci", value: "AMD Ryzen 7 7800X3D" },
      { label: "Ekran Kartı", value: "NVIDIA RTX 4080 Super 16GB" },
      { label: "Anakart", value: "MSI MAG X670E Tomahawk" },
      { label: "RAM", value: "32GB (2x16GB) DDR5 6400MHz" },
      { label: "Depolama", value: "2TB NVMe SSD (Gen4) + 2TB HDD" },
      { label: "Güç Kaynağı", value: "850W 80+ Gold" },
      { label: "Kasa", value: "Geniş hava akımlı orta/tam kule" },
      { label: "İşlemci Soğutucu", value: "360mm AIO sıvı soğutma" }
    ],
    description:
      "3D V-Cache'li Ryzen 7 7800X3D, özellikle oyunlarda sağladığı ekstra performansla biliniyor; RTX 4080 Super ile eşleştiğinde 4K'da ray tracing açıkken bile yüksek FPS elde ediliyor. Uzun süre üst düzeyde kalmak isteyenler için düşünülmüş bir liste.",
    pcPartPickerUrl: "https://pcpartpicker.com/list/"
  },
  {
    id: "content-creation",
    name: "İçerik Üretimi / Video Kurgu",
    tier: "İçerik Üretimi",
    tagline: "Video kurgu, 3D render ve ağır çok görevli iş yükleri için çok çekirdekli bir seçim.",
    estimatedPrice: "~95.000 ₺",
    parts: [
      { label: "İşlemci", value: "AMD Ryzen 9 7950X" },
      { label: "Ekran Kartı", value: "NVIDIA RTX 4070 Ti Super 16GB" },
      { label: "Anakart", value: "Gigabyte X670 AORUS Elite AX" },
      { label: "RAM", value: "64GB (2x32GB) DDR5 6000MHz" },
      { label: "Depolama", value: "2TB NVMe SSD (Gen4)" },
      { label: "Güç Kaynağı", value: "1000W 80+ Gold" },
      { label: "Kasa", value: "İyi havalandırmalı tam kule" },
      { label: "İşlemci Soğutucu", value: "360mm AIO sıvı soğutma" }
    ],
    description:
      "16 çekirdekli Ryzen 9 7950X, video render, 3B modelleme ve çoklu uygulama iş akışlarında ciddi bir zaman kazancı sağlıyor. 64GB RAM sayesinde büyük proje dosyalarında ve sanal makinelerde takılma yaşanmıyor; RTX 4070 Ti Super ise donanım hızlandırmalı render için yeterli güçte.",
    pcPartPickerUrl: "https://pcpartpicker.com/list/"
  }

  /* Yeni build eklemek için buraya (son bloktan sonra, virgülü
     unutma) yeni bir { ... } bloğu ekleyebilirsin. */
];
