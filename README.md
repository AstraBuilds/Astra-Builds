# AstraBuilds

Derlenmiş bilgisayar build'lerinin hazır parça listelerini gösteren,
tamamen statik (sunucusuz) ve reklamsız bir site. Site hiçbir şey satmaz —
sadece parça listesi sunar, satın alma işlemi PCPartPicker üzerinden
kullanıcı tarafından yapılır.

## Dosya yapısı

```
astrabuilds/
├── index.html      → Sayfanın iskeleti (buna dokunman gerekmez)
├── css/style.css   → Görünüm/renkler (buna dokunman gerekmez)
├── js/data.js      → SENİN DÜZENLEYECEĞİN TEK DOSYA — build listesi burada
├── js/app.js       → Kartları çizen mantık (buna dokunman gerekmez)
└── README.md       → Bu dosya
```

Site tamamen statiktir: veritabanı, backend veya sunucu YOKTUR. Tüm
build'ler `js/data.js` içinde düz bir liste olarak tutulur ve tarayıcı
bunları anında ekrana çizer.

## Yeni bir build (liste) eklemek

1. `js/data.js` dosyasını aç.
2. `BUILDS` dizisindeki mevcut bloklardan birini (`{ ... }`) kopyala.
3. En son bloktan hemen sonra yapıştır, bir önceki bloğun sonuna virgül
   koymayı unutma.
4. İçindeki alanları kendi build'inle değiştir:
   - `id` → benzersiz, boşluksuz bir kod (ör. `"budget-1440p-v2"`)
   - `name` → build'in başlığı
   - `tier` → kategori adı (istediğin ismi yazabilirsin, filtre
     butonu otomatik oluşur)
   - `tagline` → tek cümlelik kısa açıklama
   - `estimatedPrice` → tahmini fiyat metni, istemiyorsan `""` bırak
   - `parts` → `{ label: "...", value: "..." }` satırları, istediğin
     kadar ekleyip çıkarabilirsin
   - `description` → build'in ne için uygun olduğunu anlatan paragraf
   - `pcPartPickerUrl` → PCPartPicker liste linki
5. Dosyayı kaydet. Başka hiçbir dosyaya dokunmana gerek yok.

Bir build'i silmek istersen, o build'e ait tüm `{ ... }` bloğunu
(süslü parantezleriyle birlikte) silmen yeterli.

## Telefondan yayınlama (bilgisayar gerektirmez)

Önerilen yöntem: **GitHub Pages**. Ücretsizdir, sunucu yönetimi
gerektirmez ve dosyaları telefon tarayıcısından düzenleyebilirsin.

1. github.com'da ücretsiz bir hesap aç, yeni bir repository (depo)
   oluştur (ör. `astrabuilds`).
2. Bu klasördeki dosyaları o depoya yükle (GitHub'ın web arayüzündeki
   "Add file → Upload files" seçeneği telefondan da çalışır).
3. Depo ayarlarından **Settings → Pages** kısmına gir, kaynak olarak
   `main` dalını seç ve kaydet. Birkaç dakika içinde siten
   `https://kullanici-adin.github.io/astrabuilds` adresinde
   yayında olur.
4. Yeni bir liste eklemek istediğinde: GitHub'da `js/data.js`
   dosyasını aç, sağ üstteki kalem (düzenle) simgesine dokun,
   değişikliği yap ve "Commit changes" ile kaydet. Site birkaç
   dakika içinde otomatik güncellenir.

Daha rahat bir düzenleme ekranı istersen, depo sayfasındaki adres
çubuğunda `github.com`'u `github.dev` ile değiştirerek tarayıcı
üzerinde tam bir kod editörü açabilirsin — bu da telefonda çalışır.

## Notlar

- Site hiçbir kullanıcı girişi veya form içermez; sadece sen (kod
  üzerinden) liste eklersin.
- Reklam, izleyici (analytics) veya üçüncü taraf script'i
  bulunmuyor.
- Fraunces ve Inter yazı tipleri Google Fonts üzerinden yükleniyor;
  bu dışında hiçbir dış servise bağımlılık yok.
