/*--------------------------------------------------------------
# Nvbar
--------------------------------------------------------------*/
//notes,dibagian ini hanya membuat animasi untuk navbar

document.addEventListener("DOMContentLoaded", function() {
    // Animasi saat buka website, dia turun dari atas
    var navbar = document.querySelector(".navbar");
    navbar.classList.add("animate-navbar");

    // Ambil semua tautan di navbar
    var menuLinks = document.querySelectorAll(".navbar .menu li a");

    // Tambahkan event listener untuk setiap tautan menu
    menuLinks.forEach(function(menuLink) {
        menuLink.addEventListener("click", function(event) {
            // Ambil href tautan
            var targetId = this.getAttribute("href");

            // Ganti warna latar belakang, warna teks, dan logo
            switchNavbarStyle(targetId);
        });
    });

    // animasi saat discroll ke bawah hilang, saat ke atas muncul
    var lastScrollTop = 0;
    var navbar = document.querySelector(".navbar");
    var isNavbarVisible = true;

    window.addEventListener("scroll", function() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Cek apakah scroll ke bawah
        if (currentScroll > lastScrollTop && currentScroll > 0) {
            // Sembunyikan navbar saat scroll ke bawah
            navbar.style.top = "-75px";
            isNavbarVisible = false;
        } else {
            // Munculkan navbar saat scroll ke atas
            navbar.style.top = "0";
            isNavbarVisible = true;
        }

        lastScrollTop = currentScroll;
    });

    function toggleMenu() {
        var menu = document.querySelector('.navbar .menu');
        menu.classList.toggle('show');
    }
    
});

/*--------------------------------------------------------------
# Beranda
--------------------------------------------------------------*/
//notes, dibagian ini hanya dibuat animasi untuk beranda
function scrollToDonasi() {
    // Menggulir ke bagian donasi pada halaman
    const donasiSection = document.getElementById('donasi');
    donasiSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".animate-on-scroll");
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            
            if (scrollTop + windowHeight > elementTop) {
                element.classList.add("in-view");
            }
        });
    }

    window.addEventListener("scroll", checkIfInView);
    checkIfInView(); // Trigger the function on page load
});

const btnDonasi = document.querySelector('.btn-donasi');

btnDonasi.addEventListener('mouseover', function() {
    this.style.transform = 'translateY(-5px)';
});

btnDonasi.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

/*--------------------------------------------------------------
# Data-relawan
--------------------------------------------------------------*/


/*--------------------------------------------------------------
# Komentar
--------------------------------------------------------------*/
//notes, dibagian ini hanya dibuat animasi untuk komentar



//js fitur menampilkan pesan dari donasi
    document.addEventListener('DOMContentLoaded', function() {
        fetch('http://localhost:5000/getAllDonate')
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const testimonialsContainer = document.querySelector('.testimoni');
                    
                    // Urutkan data donasi berdasarkan createdAt secara descending
                    data.donate.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    data.donate.forEach(donation => {
                        const item = document.createElement('div');
                        item.className = 'item';

                        const pesan = document.createElement('p');
                        pesan.textContent = `"${donation.pesan}"`;

                        const dataDiv = document.createElement('div');
                        dataDiv.className = 'data';

                        const img = document.createElement('img');
                        img.src = 'foto/user.png';
                        img.alt = 'Foto testimoni';

                        const infoDiv = document.createElement('div');
                        infoDiv.className = 'info';

                        const nama = document.createElement('p');
                        nama.innerHTML = `<strong>${donation.nama}</strong>`;

                        const jumlahDonasi = document.createElement('p');
                        jumlahDonasi.className = 'jml-donasi';
                        jumlahDonasi.innerHTML = `Mendonasikan <span>${donation.jumlah}</span> Pohon`;

                        const tanggal = document.createElement('p');
                        tanggal.className = 'tanggal';
                        tanggal.textContent = new Date(donation.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });

                        infoDiv.appendChild(nama);
                        infoDiv.appendChild(jumlahDonasi);
                        infoDiv.appendChild(tanggal);

                        dataDiv.appendChild(img);
                        dataDiv.appendChild(infoDiv);

                        item.appendChild(pesan);
                        item.appendChild(dataDiv);

                        testimonialsContainer.appendChild(item);
                    });

                    // Jalankan animasi komentar setelah semua item ditambahkan
                    runCommentAnimation();
                } else {
                    console.error(data.message);
                }
            })
            .catch(error => console.error('Terjadi kesalahan:', error));
 

    // Fungsi untuk animasi komentar
    function runCommentAnimation() {
    // Fungsi untuk scroll otomatis
        const comments = document.querySelectorAll('.testimoni .item');
        let index = 0;

        function updateComments() {
            comments.forEach((comment, i) => {
                comment.classList.remove('small');
                if (i !== index) {
                    comment.classList.add('small');
                }
            });
        }

        function scrollComments() {
            index = (index + 1) % comments.length;
            const container = document.querySelector('.testimoni');
            const itemWidth = comments[0].clientWidth; // Lebar satu item
            const offset = (container.clientWidth - itemWidth) / 2; // Offset untuk item berada di tengah
            container.scrollTo({
                left: index * itemWidth - offset,
                behavior: 'smooth'
            });
            updateComments();
        }

        // Geser ke posisi awal dengan item pertama di tengah
        function initScroll() {
            const container = document.querySelector('.testimoni');
            const itemWidth = comments[0].clientWidth;
            const offset = (container.clientWidth - itemWidth) / 2;
            container.scrollLeft = -offset;
        }

        initScroll();
        setInterval(scrollComments, 3000);
        updateComments();
    }
});
/*--------------------------------------------------------------
# Program
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# Informasi
--------------------------------------------------------------*/
//notes, bagian ini hanya animasi informasi
document.addEventListener("DOMContentLoaded", function() {
    // Ambil panah kiri dan kanan
    var leftArrow = document.querySelector(".arrow-left");
    var rightArrow = document.querySelector(".arrow-right");

    // Ambil kontainer box informasi
    var boxContainer = document.querySelector(".box-container");

    // Hitung lebar satu box (termasuk margin)
    var boxWidth = document.querySelector(".box").offsetWidth;

    // Tambahkan event listener untuk panah kiri
    leftArrow.addEventListener("click", function() {
        // Geser kontainer ke kiri sebesar tiga kali lebar satu box
        boxContainer.scrollLeft -= (1 * boxWidth);
    });

    // Tambahkan event listener untuk panah kanan
    rightArrow.addEventListener("click", function() {
        // Geser kontainer ke kanan sebesar tiga kali lebar satu box
        boxContainer.scrollLeft += (1 * boxWidth);
    });
});

//notes, dibagian ini animasi popup detail informasi
document.addEventListener("DOMContentLoaded", function() {
    const detailElements = document.querySelectorAll('.detail');
    const popupOverlayDetail = document.querySelector('.popup-overlay-detail');
    const popupDetail = document.querySelector('.popup-detail');
    const fullDetail = document.querySelector('.full-detail');

    detailElements.forEach(function(detail) {
        if (detail.scrollHeight > detail.clientHeight) {
            var selengkapnya = document.createElement('span');
            selengkapnya.classList.add('selengkapnya');
            selengkapnya.innerText = ' selengkapnya';
            detail.classList.add('limited');
            detail.parentNode.insertBefore(selengkapnya, detail.nextSibling); // Pindahkan "selengkapnya" ke bawah "detail"

            selengkapnya.addEventListener('click', function(event) {
                fullDetail.innerText = detail.innerText;
                popupOverlayDetail.style.display = 'block';
                popupDetail.style.display = 'block';

                var rect = detail.getBoundingClientRect();
                popupDetail.style.top = rect.top + window.scrollY + 'px';
                popupDetail.style.left = rect.left + window.scrollX + 'px';
                popupDetail.style.width = detail.clientWidth + 'px';
            });
        }
    });

    // Tambahkan event listener ke overlay untuk menutup popup detail
    popupOverlayDetail.addEventListener('click', function(event) {
        if (event.target === popupOverlayDetail) {
            popupOverlayDetail.style.display = 'none';
            popupDetail.style.display = 'none';
        }
    });

    // Mencegah penutupan popup detail saat mengklik di dalam popup
    popupDetail.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

//notes, dibagian ini animasi dan fungski setlah tombol btn-informasi diklik
document.addEventListener('DOMContentLoaded', function() {
    //-----proses popup------------
    // Ambil elemen-elemen yang diperlukan untuk popup form
    const btnInformasi = document.querySelector('.btn-informasi');
    const popupOverlayForm = document.querySelector('.popup-overlay-form');
    const popupInformasi = document.querySelector('.popup-informasi');
    const popupCloseForm = document.querySelector('.popup-close-form');
    const btnKirim = document.querySelector('.btn-kirim');
    const popupOverlayKirim = document.querySelector('.popup-overlay-kirim');
    const popupKirim = document.querySelector('.popup-kirim');
    const popupOverlayTerima = document.querySelector('.popup-overlay-terima');
    const popupTerima = document.querySelector('.popup-terima');

    // Tambahkan event listener ke tombol Salurkan Informasimu
    if (btnInformasi) {
        btnInformasi.addEventListener('click', function() {
            popupOverlayForm.style.display = 'block';
            popupInformasi.style.display = 'block';
        });
    }

    // Tambahkan event listener ke tombol Close pada popup form
    if (popupCloseForm) {
        popupCloseForm.addEventListener('click', function() {
            popupOverlayForm.style.display = 'none';
            popupInformasi.style.display = 'none';
        });
    }

    // Menambahkan event listener untuk mengatur perilaku tombol "Kirim"
    if (btnKirim) {
        btnKirim.addEventListener('click', function(event) {
            console.log('Kirim button clicked');  // Debug log

            // Panggil fungsi validasi form
            if (!validateForm()) {
                event.preventDefault();  // Mencegah pengiriman form jika validasi gagal
                return;
            }

            // Tampilkan popup kirim
            popupOverlayForm.style.display = 'none';
            popupInformasi.style.display = 'none';
            popupOverlayKirim.style.display = 'block';
            popupKirim.style.display = 'block';

            // Set timeout untuk menampilkan popup terima setelah 2 detik
            setTimeout(function() {
                console.log('Showing terima popup');  // Debug log

                popupOverlayKirim.style.display = 'none';
                popupKirim.style.display = 'none';
                popupOverlayTerima.style.display = 'block';
                popupTerima.style.display = 'block';

                // Set timeout untuk menutup popup terima setelah 5 detik
                setTimeout(function() {
                    console.log('Closing terima popup');  // Debug log

                    popupOverlayTerima.style.display = 'none';
                    popupTerima.style.display = 'none';
                    window.location.href = '#informasi'; // Ganti '#informasi' dengan ID atau URL yang sesuai
                
                    // Refresh halaman setelah scroll
                    setTimeout(function() {
                        window.location.reload(); // Refresh halaman
                    }, 1000); // Tambahkan sedikit delay untuk memastikan scroll selesai sebelum refresh
                }, 5000); // Waktu dalam milidetik (5 detik)
            }, 2000); // Waktu dalam milidetik (2 detik)
        });
    }

    //-----------proses didalam form
    // Fungsi untuk mengubah tanggal menjadi format huruf
    function getFormattedDate(date) {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return day + ' ' + months[monthIndex] + ' ' + year;
    }

    // Fungsi untuk memperbarui pratinjau
    function updatePreview() {
        const nama = document.getElementById('isi-nama').value;
        const provinsi = document.getElementById('isi-provinsi').value;
        const kota = document.getElementById('isi-kota').value;
        const detail = document.getElementById('isi-detail').value;
        const tanggal = getFormattedDate(new Date());

        // Menetapkan placeholder jika nilai input kosong
        document.getElementById('preview-nama').textContent = nama || '[Nama]';
        document.getElementById('preview-tanggal').textContent = tanggal;
        document.getElementById('preview-kota').textContent = kota || '[Kota/Kabupaten]';
        document.getElementById('preview-provinsi').textContent = provinsi || '[Provinsi]';
        document.getElementById('preview-text').textContent = detail || '[Detail]';
    }

    // Mendaftarkan event listener untuk setiap input
    const formInputs = document.querySelectorAll('#popup-form input, #popup-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Memanggil updatePreview saat halaman dimuat
    updatePreview();

    // Fungsi untuk memeriksa apakah semua kolom sudah diisi
    function validateForm() {
        const inputs = document.querySelectorAll('#popup-form input, #popup-form textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('warning-border');
                input.classList.add('blink');
                isValid = false;
                setTimeout(() => {
                    input.classList.remove('warning-border');
                    input.classList.remove('blink');
                }, 2000); // Menghapus kelas setelah 2 detik
            }
        });

        return isValid;
    }

    // Animasi melebihi batas karakter
    const infoNama = document.getElementById('isi-nama');
    const warning = document.getElementById('warning');

    function checkInputLength() {
        if (infoNama.value.length === 0) {
            warning.style.display = 'none';
        } else if (infoNama.value.length >= parseInt(infoNama.getAttribute('maxlength'))) {
            warning.style.display = 'inline';
            setTimeout(function() {
                warning.style.display = 'none';
            }, 1000); // Menyembunyikan pesan peringatan setelah 2 detik
        } else {
            warning.style.display = 'none';
        }
    }

    // Mendaftarkan event listener untuk input nama
    infoNama.addEventListener('input', checkInputLength);

    // Memanggil checkInputLength saat halaman dimuat untuk menangani kasus input yang sudah diisi sebelumnya
    checkInputLength();

});

/*--------------------------------------------------------------
# Blog
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# Donasi
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    // animasi melebihi batas karakter
    const dnsNama = document.getElementById('dns-nama');
    const warningNama = document.getElementById('warning-nama');
    const dnsKomentar = document.getElementById('dns-komentar');
    const warningKomentar = document.getElementById('warning-komentar');
    const checkboxAnonim = document.getElementById('anonim');

    function checkInputLength(input, warning) {
        if (input.value.length === 0) {
            warning.style.display = 'none';
        } else if (input.value.length >= parseInt(input.getAttribute('maxlength'))) {
            warning.style.display = 'inline';
            setTimeout(function() {
                warning.style.display = 'none';
            }, 1000); // Menyembunyikan pesan peringatan setelah 1 detik
        } else {
            warning.style.display = 'none';
        }
    }
    // Mendaftarkan event listener untuk input nama
    dnsNama.addEventListener('input', function() {
        checkInputLength(dnsNama, warningNama);
    });

    // Mendaftarkan event listener untuk input komentar
    dnsKomentar.addEventListener('input', function() {
        checkInputLength(dnsKomentar, warningKomentar);
    });

    // Mendaftarkan event listener untuk checkbox anonim
    checkboxAnonim.addEventListener('change', function() {
        if (checkboxAnonim.checked) {
            dnsNama.value = "Masyarakat #Peduli";
        } else {
            dnsNama.value = ""; // Reset nilai jika checkbox tidak dicentang
        }
    });

    const btnSubmit = document.querySelector('.btn-submit');
    const popupOverlayPembayaran = document.querySelector('.popup-overlay-pembayaran');
    const popupPembayaran = document.querySelector('.popup-pembayaran');
    const btnTidak = document.querySelector('.btn-tidak');
    const btnIya = document.querySelector('.btn-iya');
    const warningMessage = document.querySelector('.warning-message');

    function validateForm() {
        const inputsValid = validateInputs();
        const bundlingValid = validateBundling();

        return inputsValid && bundlingValid;
    }

    btnSubmit.addEventListener('click', function(event) {
        console.log('Submit button clicked');
        if (!validateForm()) {
            event.preventDefault();
            return;
        }

        popupOverlayPembayaran.style.display = 'block';
        popupPembayaran.style.display = 'block';
    });

    btnTidak.addEventListener('click', function() {
        popupOverlayPembayaran.style.display = 'none';
        popupPembayaran.style.display = 'none';
    });


    let selectedValue = null;
    btnIya.addEventListener('click', function() {
        const nama = document.getElementById('dns-nama').value;
        const pesan = document.getElementById('dns-komentar').value;

            // Kirim data ke backend dengan fetch
        fetch('http://localhost:5000/createDonate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `jumlah=${selectedValue}&nama=${nama}&pesan=${pesan}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === '200') {
                popupOverlayPembayaran.style.display = 'none';
                popupPembayaran.style.display = 'none';
                const popupOverlayTransfer = document.querySelector('.popup-overlay-transfer');
                const popupTransfer = document.querySelector('.popup-transfer');
                popupOverlayTransfer.style.display = 'block';
                popupTransfer.style.display = 'block';
                setTimeout(function() {
                    popupOverlayTransfer.style.display = 'none';
                    popupTransfer.style.display = 'none';
                    const popupOverlayBerhasil = document.querySelector('.popup-overlay-berhasil');
                    const popupBerhasil = document.querySelector('.popup-berhasil');
                    popupOverlayBerhasil.style.display = 'block';
                    popupBerhasil.style.display = 'block';
                    setTimeout(function() {
                        popupOverlayBerhasil.style.display = 'none';
                        popupBerhasil.style.display = 'none';
                        window.location.href = '#data-relawan';
                        setTimeout(function() {
                            window.location.reload();
                        }, 2000);
                    }, 5000);
                }, 5000);
            } else {
                alert('Gagal melakukan donasi: ' + data.message);
            }
        })
        .catch(error => console.error('Terjadi kesalahan:', error));
    });

    


    function validateInputs() {
        const inputs = document.querySelectorAll('#popup-form-donasi input, #popup-form-donasi textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('warning-border');
                input.classList.add('blink');
                isValid = false;
                setTimeout(() => {
                    input.classList.remove('warning-border');
                    input.classList.remove('blink');
                }, 2000);
            }
        });

        return isValid;
    }



    function validateBundling() {
        const bundlingButtons = document.querySelectorAll('.bundling');
        let bundlingSelected = false;
    
        bundlingButtons.forEach(button => {
            if (button.classList.contains('active')) {
                bundlingSelected = true;
                document.querySelectorAll('.bundling').forEach(btn => btn.classList.remove('selected'));
                selectedValue = button.getAttribute('data-value');
            }
        });
    
        if (!bundlingSelected) {
            warningMessage.classList.add('active');
            // Hapus pesan peringatan setelah 2 detik (2000 milidetik)
            setTimeout(() => {
                warningMessage.classList.remove('active');
            }, 2000);
        } else {
            warningMessage.classList.remove('active');
        }
    
        return bundlingSelected;
    }
    
    const buttons = document.querySelectorAll('.harga-bundling .bundling');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            warningMessage.classList.remove('active');
        });
    });
    
});



/*--------------------------------------------------------------
# Tentang Kami
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# Login
----------------------------------------------------------------*/


/*--------------------------------------------------------------
# LogOut
--------------------------------------------------------------*/
// // Fungsi untuk mengatur cookies
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// // Fungsi untuk menghapus cookies
// function deleteCookie(cname) {
//     document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// }

// // Fungsi untuk mendapatkan nilai cookies berdasarkan nama
// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// // Temukan tombol logout berdasarkan id
// var logoutButton = document.getElementById('logoutBtn');

// // Tambahkan event listener untuk menangani klik tombol logout
// logoutButton.addEventListener('click', function() {
//     // Hapus cookie saat logout
//     deleteCookie("loginStatus");
//     // Arahkan pengguna ke halaman login (ganti "halaman-login.html" dengan path yang sesuai)
//     window.location.href = "halaman-login.html";
// });

// // Cek apakah pengguna telah login saat halaman dimuat
// window.onload = function() {
//     // Periksa cookie "loginStatus"
//     var loginStatus = getCookie("loginStatus");
//     // Jika cookie "loginStatus" tidak ditemukan atau memiliki nilai "false"
//     if (loginStatus !== "true") {
//         // Arahkan pengguna ke halaman login
//         window.location.href = "halaman-login.html";
//     }
// };