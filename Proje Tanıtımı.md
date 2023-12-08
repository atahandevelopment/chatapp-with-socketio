# chatapp-with-socketio

# Bu proje Nodejs + ReactJS + SocketIO kullanılarak geliştirilen Real Time Chat uygulamasıdır.

Projede Kullanılan Teknolojiler : 
1. Nodejs Javascript, React uygulaması Typescript base olarak yazıldı.
2. Backend tarafında Token olarak JWT token,
3. Database olarak MongoDB üzerinde bir cluster oluşturuldu.
4. Api Route'ları için ExpressJS,
5. Kullanıcıların parolalarının kriptolanarak database'de saklanabilmesi için bcrypt şifreleme paketi,
6. Kullanıcıların tam zamanlı olarak mesajlaşabilmeleri için Socket.IO paketi,
7. Swagger ile API dokümantasyonu hazırlandı.
8. Docker Container mimarisi,
   # Frontend Tarafında
1. TailwindCSS,
2. Ant design,
3. Styled Components,
4. Api istekleri için Axios gibi teknolojiler kullanıldı.

# Proje Kurulumları
Terminali açın;

`git clone https://github.com/atahandevelopment/chatapp-with-socketio.git` komutunu girin.
proje bilgisayarınıza indikten sonra 
# Docker ile Çalıştırma
Bilgisayarınıza Docker kurun;
`docker-compose up --build` komutu ile projenin kurulumunu yaptıktan sonra çalışacaktır. çalışan process'leri görebilmek için `docker ps` komutunu kullanabilirsiniz.

# Npm ile çalıştırma
  # 1. Server Kurulumu
1. Server klasörüne giderek `npm install` komutunu kullanın ve projenin paketlerini yükleyin.
2. Geliştirme ortamında çalışmak için `npm run dev` komutunu kullanın. Bu komut projenin Nodemon ile çalıştırılmasını sağlayayacak ve değişiklikler canlı olarak takip edilecektir.

 # 2. Frontend Kurulumu
 1. `npm install` komutu ile proje paketlerini yükleyin.
 2. `npm run dev` komutu ile projeyi ayağa kaldırın.

    # NOT: Uygulamanın düzgün çalışabilmesi için Backend'in ayağa kaldırılması ve gerekmektedir.
