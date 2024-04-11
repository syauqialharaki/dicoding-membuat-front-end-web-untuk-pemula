/**
 * [
 *
 * TIPE DATA YANG DIGUNAKAN:
 *    {
 *      id: <string | number>
 *      title: <string>
 *      author: <string>
 *      year: <int>
 *      isComplete: <boolean>
 *    }
 *
 * CONTOH DATA YANG DIHASILKAN:
 *    {
 *      id: 3657848524
 *      title: Start With Why
 *      author: Simon Sinec
 *      year: 2009
 *      isComplete: yes
 *    }
 *
 * ]
 */

// 1. DEKLARASI KONSTANTA DAN VARIABEL GLOBAL

// variable berisi array yang akan menampun banyak object yang tercipta berisikan data-data buku user
const bookshelfs = [];
// variable yang bertujuan untuk mendefinisikan custom event dengan nama "render-bookshelf" yang berfungsi untuk merender (pencetakan seperti penggambaran ulang)
// atau sederhananya "untuk memperbarui data yang ditampilkan"
const RENDER_EVENT = "render-bookshelf";
const SAVED_EVENT = "saved-bookshelf";
const STORAGE_KEY = "BOOKSHELF_APPS";

// 2. Fungsi utilitas

/**
 * Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak
 *
 * @returns boolean
 */
function isStorageExist() /* boolean */ {
  // melakukan pengecekan apabila tipe data storage mengembalikan nilai undefined maka storage tidak tersedia
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

/**
 * Fungsi ini digunakan untuk menyimpan data ke localStorage
 * berdasarkan KEY yang sudah ditetapkan sebelumnya.
 */
function saveData() {
  // melakukan pengecekan keberadaan storage melalui fungsi isStorageExist() yang mengembalikan nilai boolean
  if (isStorageExist()) {
    // melakukang parsing data bookshelfs melalui fungsi JSON.stringfy untuk mengkonversikan tipe data bookshelfs yang berupa objek ke string (karena storage hanya mampu mendukung tipe data teks)
    const parsed /* string */ = JSON.stringify(bookshelfs);
    // menyimpan data storage hasil parsing pada variabel parsed kedalam key yang diwakili "BOOKSHELF_APPS" dalam variabel STORAGE_KEY
    localStorage.setItem(STORAGE_KEY, parsed);
    // pemanggilan custom event baru untuk mempermudah proses debugging/tracking ketika terjadi perubahan data
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see bookshelfs}
 */

function loadDataFromStorage() {
  const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const bookshelf of data) {
      bookshelfs.push(bookshelf);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

// ini adalah fungsi generateId() yang mengembalikan nilai dari operasi +new Date()
function generateId() {
  // new Date() digunakan untuk membuat objek tanggal baru yang merepresentasikan waktu saat ini
  // mengonversi tanggal yang dibuat menjadi angka dengan menggunakan operator unearary "+"
  return +new Date();
}

// fungsi untuk membuat object baru dari data yang sudah disediakan inputan berdasarkan parameter yang ditetapkan (id, title, author, year, isComplete)
function generateBookshelfObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

// fungsi yang bertujuan untuk mencari dan mengembalikan objek buku yang memiliki ID tertentu dari array bookshelfs
// menerima parameter berupa "bookshelfId" yang merupakan ID dari buku yang dicari
// berguna karena akan dipanggil oleh fungsi "addBookToCompleted" untuk melakukan pengecekan
function findBookshelf(bookshelfId) {
  // melakukan interasi dari array bookshelfs dan menyimpannya di variable bookshelfItem
  for (const bookshelfItem of bookshelfs) {
    // melakukan pengecekan untuk kesamaan antara properti ID dari object bookshelfItem dengan yang disimpan pada bookshelfId sebagai parameternya
    if (bookshelfItem.id === bookshelfId) {
      // mengembalikan bookshelfItem sebagai object apabila ditemukan kecocokan ID saat proses pengecekan
      return bookshelfItem;
    }
  }
  // mengembalikan nilai null apabila tidak ada buku yang sesuai dengan ID yang ditentukan
  return null;
}

// melakukan interasi dari array bookshelfs dan menyimpannya di variable index
function findBookshelfIndex(bookshelfId) {
  // melakukan interasi dari array bookshelfs dan menyimpannya di variable index
  for (const index in bookshelfs) {
    // melakukan pengecekan untuk kesamaan antara properti ID dari object bookshelfItem dengan yang disimpan pada bookshelfId sebagai parameternya
    if (bookshelfs[index].id === bookshelfId) {
      // mengembalikan index  apabila ditemukan kecocokan ID saat proses pengecekan
      return index;
    }
  }
  return -1;
}

/**
 * secara umum:
 * 1. "document.createElement()" digunakan untuk membuat object DOM sehingga kita dapat memanipulasi tampilan pada HTML
 * 2. properti "inner text" untuk melakukan assign berupa text pada variable yang dituju berdasarkan value yang diambil
 * 3. method append() akan menambahkan variabel representasi elemen HTML pada parameternya kedalam elemen yang dipanggilnya
 * 4. setAttribute("",) adalah method yang digunakan untuk menetapkan nilai atribut pada elemen HTML
 **/

// fungsi bernama "makeBookshelf" yang menerima "bookshelfObject" sebagai argumen
// fungsi ini bertujuan untuk membuat dan mengembalikan sebuah elemen HTML yang mewakili bookshelf berdasarkan informasi yang terdapat didalam objek "bookshelfObject"
function makeBookshelf(bookshelfObject) {
  // metode destructuring assignment untuk mengekstrak nilai dari object/array dan menyimpannya kedalam beberapa variable teripsah
  const { id, title, author, year, isComplete } = bookshelfObject;

  // deklarasi variabel "textTitle" untuk membuat elemen H3
  const textTitle = document.createElement("h3");
  // menmenambahkan value dari title berbentuk text kedalam variable textTitle sehingga membentuk tampilan text dari value menggunakan elemen H3
  textTitle.innerText = title;
  // deklarasi variabel "textAuthor" untuk membuat elemen p
  const textAuthor = document.createElement("p");
  // menmenambahkan value dari author berbentuk text kedalam variable textAuthor sehingga membentuk tampilan text dari value menggunakan elemen p
  textAuthor.innerText = "Penulis: " + author;
  // deklarasi variabel "textYear" untuk membuat elemen p
  const textYear = document.createElement("p");
  // menenambahkan value dari year berbentuk text kedalam variable textYear sehingga membentuk tampilan text dari value menggunakan elemen p
  textYear.innerText = "Tahun: " + year;

  // --------------------------------------------------------------------------------
  // deklarasi variabel "ButtonContainer" untuk membuat elemen div
  const buttonContainer = document.createElement("div");
  // menerapkan class "action" pada tampilan elemen div
  buttonContainer.classList.add("action");
  // --------------------------------------------------------------------------------

  // deklarasi variabel "textContainer" untuk membuat elemen article
  const textContainer = document.createElement("article");
  // menerapkan class "book_item" pada tampilan elemen div
  textContainer.classList.add("book_item");
  // mengelompokkan 3 elemen html textTitle, textAuthor, dan textYear kedalam elemen HTML yang disimpan pada variable textContainer
  textContainer.append(textTitle, textAuthor, textYear, buttonContainer);

  if (isComplete) {
    // deklarasi variabel "undoButton" untuk membuat elemen button
    const undoButton = document.createElement("button");
    // menenambahkan value berbentuk text kedalam variable undoButton sehingga membentuk tampilan text dengan nilai "Belum Selesai Dibaca"
    undoButton.innerText = "Belum Selesai dibaca";
    // menerapkan css class "green" pada tampilan elemen button
    undoButton.classList.add("green");
    //ini adalah listener yang akan menjalankan kode fungsi didalamnya apabila undo Button di klik
    undoButton.addEventListener("click", function () {
      // fungsi yang akan dijalankan ketika button di klik
      undoBookFromCompleted(id);
    });
    // deklarasi variabel "deleteButton" untuk membuat elemen button
    const deleteButton = document.createElement("button");
    // menenambahkan value berbentuk text kedalam variable "deleteButton" sehingga membentuk tampilan text dengan nilai "Hapus"
    deleteButton.innerText = "Hapus Buku";
    // menerapkan css class "red" pada tampilan elemen button
    deleteButton.classList.add("red");
    //ini adalah listener yang akan menjalankan kode fungsi didalamnya apabila delete Button di klik
    deleteButton.addEventListener("click", function () {
      // fungsi yang akan dijalankan ketika button di klik
      removeBookFromCompleted(id);
      // document.getElementById(`${id}`).remove();
    });
    // memanggil variable "finishButton & deleteButton" menjadi child dari elemen "container"
    buttonContainer.append(undoButton, deleteButton);
  } else {
    // deklarasi variabel "finishButton" untuk membuat elemen button
    const finishButton = document.createElement("button");
    // menenambahkan value berbentuk text kedalam variable finishButton sehingga membentuk tampilan text dengan nilai "Selesai Dibaca"
    finishButton.innerText = "Selesai dibaca";
    // menerapkan css class "green" pada tampilan elemen button
    finishButton.classList.add("green");
    //ini adalah listener yang akan menjalankan kode fungsi didalamnya apabila finish button di klik
    finishButton.addEventListener("click", function () {
      // fungsi yang akan dijalankan ketika button di klik
      addBookToCompleted(id);
    });

    // deklarasi variabel "deleteButton" untuk membuat elemen button
    const deleteButton = document.createElement("button");
    // menenambahkan value berbentuk text kedalam variable "deleteButton" sehingga membentuk tampilan text dengan nilai "Hapus"
    deleteButton.innerText = "Hapus Buku";
    // menerapkan css class "red" pada tampilan elemen button
    deleteButton.classList.add("red");
    //ini adalah listener yang akan menjalankan kode fungsi didalamnya apabila delete Button di klik
    deleteButton.addEventListener("click", function () {
      // fungsi yang akan dijalankan ketika button di klik
      removeBookFromCompleted(id);
      // document.getElementById(`${id}`).remove();
    });
    // memanggil variable "undoButton" menjadi child dari elemen "container"
    buttonContainer.append(finishButton, deleteButton);
  }
  // bentuk pengembalian hasil dari operasi yang dilakukan agar dapat digunakan kembali
  return textContainer;
}

// 3. Penanganan Kejadian

// ini adalah listener yang akan menjalankan kode didalamnya apabila DOMContentLoaded (semua elemen HTML selesai dimuat) dibangkitkan
document.addEventListener("DOMContentLoaded", function () {
  // ini menangkap inputan dari form dengan ID inputBook dan disimpan pada variable submitForm
  const submitForm /* HTMLFormElement */ = document.getElementById("inputBook");
  //ini adalah listener yang akan menjalankan kode didalamnya apabila disubmit, fungsi dengan parameter event adalah penanganan yang akan dieksekusi ketika event terjadi
  submitForm.addEventListener("submit", function (event) {
    // memanggil method preventDefault dari object event, ini dapat membuat website tidak otomatis mereload supaya data yang disimpan dalam storage terjaga
    event.preventDefault();
    // ini akan membungkus inputan dari form inputBook dan diproses oleh function addBookshelf
    addBookshelf();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log("Data berhasil di simpan.");
});

// menambahkan listener ke object "document" yang akan menjalankan parameter kedua ketika event bernama "RENDER_EVENT" yang memiliki nilai "render-bookshelf" terjadi
// implementasi fungsi "makeBookshelf" dengan menampilkan beberapa buku yang tersimpan pada array
document.addEventListener(RENDER_EVENT, function () {
  // mencetak nilai dari variable bookshelf yang berupa object ke console menggunakan console.log()
  console.log(bookshelfs);
  // membuat variable "listUnCompleted" untuk menangkap elemen HTML dengan ID "incompleteBookshelfList" sebagai daftar list dari buku yang belum selesai dibaca
  const listUnCompleted = document.getElementById("incompleteBookshelfList");
  // membuat variable "listCompleted" untuk menangkap elemen HTML dengan ID "completeBookshelfList" sebagai daftar list dari buku yang sudah selesai dibaca
  const listCompleted = document.getElementById("completeBookshelfList");
  // memberikan elemen HTML dengan isian kosong pada variable listUnCompleted dengan maksud agar daftar buku yang belum selesai dibaca dapat diperbarui tanpa adanya tumpang tindih dari konten sebelumnya
  listUnCompleted.innerHTML = "";
  // memberikan elemen HTML dengan isian kosong pada variable listCompleted dengan maksud agar daftar buku yang sudah selesai dibaca dapat diperbarui tanpa adanya tumpang tindih dari konten sebelumnya
  listCompleted.innerHTML = "";
  // proses iterasi melalui setiap elemen dalam "bookshelfs" yang disimpan satupersatu kedalam variable "bookshelfItem"
  for (const bookshelfItem of bookshelfs) {
    // memanggil fungsi "makeBookShelf" untuk membuat elemen HTML yang mewakili buku berdasarkan informasi didalam parameter "bookshelfItem" yang terpanggil
    const bookshelfElement = makeBookshelf(bookshelfItem);
    // melakukan pengujian berupa apabila isi dari properti "isComplete" adalah true, maka..
    if (bookshelfItem.isComplete) {
      // memanggil variable "bookshelfElement" menjadi child dari elemen "bookshelfItem"
      listCompleted.append(bookshelfElement);
      // jika isi dari properti "isUnCompleted" adalah selain true (false), maka..
    } else {
      // memanggil variable "bookshelfElement" menjadi child dari elemen "bookshelfItem"
      listUnCompleted.append(bookshelfElement);
    }
  }
});

// 4. Fungsi-fungsi utama

// membuat fungsi untuk menambahkan buku baru
function addBookshelf() {
  // membentuk variabel title yang menangkap inputan dengan ID inputBookTitle dan memanggil properti value untuk mendapatkan nilai yang diinputkannya
  const title = document.getElementById("inputBookTitle").value;
  // membentuk variabel author yang menangkap inputan dengan ID inputBookAuthor dan memanggil properti value untuk mendapatkan nilai yang diinputkannya
  const author = document.getElementById("inputBookAuthor").value;
  // membentuk variabel year yang menangkap inputan dengan ID inputBookYear dan memanggil properti value untuk mendapatkan nilai yang diinputkannya
  const year = Number(document.getElementById("inputBookYear").value);
  // membentuk variabel year yang menangkap inputan dengan ID inputBookYear dan memanggil properti value untuk mendapatkan nilai yang diinputkannya
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  // membentuk variable generatedID yang diinisiasi dengan hasil dari pemanggilan fungsi generateId()
  const generatedID = generateId();

  // membuat object baru dari bookshelf dengan memanggil fungsi helper "generateBookshelfObject"
  const bookshelfObject = generateBookshelfObject(
    generatedID,
    title,
    author,
    year,
    isComplete
  );
  // object ini disimpan pada array "bookshelfs" menggunakan metode push()
  bookshelfs.push(bookshelfObject);
  // memanggil costum event "RENDER_EVENT" menggunakan method dispatchEvent()
  // custom event ini digunakan untuk merender data yang telah disimpan pada array "bookshelf"
  document.dispatchEvent(new Event(RENDER_EVENT));
  // memanggil fungsi saveData() agar perubahan yang ada dapat disimpan kedalam storage
  saveData();
  // menampilkan popup berhasil ditambahkan ke dalam Rak Belum Selesai Dibaca/Selesai Dibaca
  if (isComplete) {
    window.alert('Buku berhasil dipindahkan kedalam Rak "Selesai Dibaca"');
  } else {
    window.alert(
      'Buku berhasil dipindahkan kedalam Rak "Belum Selesai Dibaca"'
    );
  }
}

function addBookToCompleted(bookshelfId /* HTMLELement */) {
  const bookshelfTarget = findBookshelf(bookshelfId);

  if (bookshelfTarget == null) return;

  bookshelfTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  // memanggil fungsi saveData() agar perubahan yang ada dapat disimpan kedalam storage
  saveData();
  // menampilkan popup berhasil dipindahkan ke Rak Selesai Dibaca
  window.alert('Buku berhasil dipindahkan kedalam Rak "Selesai Dibaca"');
}

function removeBookFromCompleted(bookshelfId /* HTMLELement */) {
  const bookshelfTarget = findBookshelfIndex(bookshelfId);

  if (bookshelfTarget === -1) return;

  bookshelfs.splice(bookshelfTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  // memanggil fungsi saveData() agar perubahan yang ada dapat disimpan kedalam storage
  saveData();
  // menampilkan popup berhasil dihapus dari rak
  window.alert("Buku berhasil dihapus dari Rak");
}

function undoBookFromCompleted(bookshelfId /* HTMLELement */) {
  const bookshelfTarget = findBookshelf(bookshelfId);
  if (bookshelfTarget == null) return;

  bookshelfTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  // memanggil fungsi saveData() agar perubahan yang ada dapat disimpan kedalam storage
  saveData();
  // menampilkan popup berhasil dipindahkan ke Rak Belum Selesai Dibaca
  window.alert('Buku berhasil dipindahkan ke Rak "Belum Selesai Dibaca"');
}
