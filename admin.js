document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("#loginForm");
        const eField = form.querySelector(".email"),
              eInput = eField.querySelector("input"),
              pField = form.querySelector(".password"),
              pInput = pField.querySelector("input");

        form.onsubmit = async (e) => {
            e.preventDefault();

            checkEmail();
            checkPass();

            if (eField.classList.contains("error")) {
                eField.classList.add("shake");
                setTimeout(() => {
                    eField.classList.remove("shake");
                }, 500);
            }
            if (pField.classList.contains("error")) {
                pField.classList.add("shake");
                setTimeout(() => {
                    pField.classList.remove("shake");
                }, 500);
            }

            eInput.onkeyup = () => { checkEmail(); }
            pInput.onkeyup = () => { checkPass(); }

            function checkEmail() {
                let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!eInput.value.match(pattern)) {
                    eField.classList.add("error");
                    eField.classList.remove("valid");
                    let errorTxt = eField.querySelector(".error-txt");

                    (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address": errorTxt.innerText = "Email tidak boleh kosong!";
                } else {
                    eField.classList.remove("error");
                    eField.classList.add("valid");
                }
            }

            function checkPass() {
                if (pInput.value == "") {
                    pField.classList.add("error");
                    pField.classList.remove("valid");
                    let errorTxt = pField.querySelector(".error-txt");
                    errorTxt.innerText = "Password tidak boleh kosong!";
                } else {
                    pField.classList.remove("error");
                    pField.classList.add("valid");
                }
            }

            if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
                try {
                    const response = await fetch('http://localhost:5000/loginAdmin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: eInput.value,
                            password: pInput.value
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();

                    if (data.token) {
                        // Save the token to localStorage or cookies
                        localStorage.setItem('token', data.token);

                        // Redirect to the admin page
                        window.location.href = "admin.html";
                    } else {
                        
                        // Handle email field
                        eField.classList.add("error");
                        eField.classList.remove("valid");
                        let emailErrorTxt = eField.querySelector(".error-txt");
                        emailErrorTxt.innerText = "Invalid email !!!";

                        // Handle password field
                        pField.classList.add("error");
                        pField.classList.remove("valid");
                        let passwordErrorTxt = pField.querySelector(".error-txt");
                        passwordErrorTxt.innerText = "Invalid password!!!";

                    
                    }
                } catch (error) {
                    alert(error.message);
                }
            }
        }
    
    });


    document.addEventListener("DOMContentLoaded", function () {
        // Animasi saat buka website, dia turun dari atas
        var navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.classList.add("animate-navbar");
    
            // Ambil semua tautan di navbar
            var menuLinks = document.querySelectorAll(".navbar .menu li a");
    
            // Tambahkan event listener untuk setiap tautan menu
            menuLinks.forEach(function (menuLink) {
                menuLink.addEventListener("click", function (event) {
                    // Ambil href tautan
                    var targetId = this.getAttribute("href");
    
                    // Ganti warna latar belakang, warna teks, dan logo
                    switchNavbarStyle(targetId);
    
                    // Pastikan default aksi klik tautan tidak terjadi
                    event.preventDefault();
                });
            });
    
            // Animasi saat discroll ke bawah hilang, saat ke atas muncul
            var lastScrollTop = 0;
            var isNavbarVisible = true;
    
            window.addEventListener("scroll", function () {
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
        }
    
        // Temukan tombol logout berdasarkan id
        var logoutButton = document.getElementById('logoutBtn');
        if (logoutButton) {
            // Tambahkan event listener untuk menangani klik tombol logout
            logoutButton.addEventListener('click', function () {
                // Arahkan pengguna ke halaman login (ganti "halaman-login.html" dengan path yang sesuai)
                window.location.href = "login.html";
            });
        }
    
        // Temukan tombol more berdasarkan kelas
        var moreButtons = document.querySelectorAll('.more-button');
        if (moreButtons) {
            // Tambahkan event listener untuk menampilkan popup saat tombol more diklik
            moreButtons.forEach(function (button) {
                button.addEventListener('click', function (event) {
                    var rect = button.getBoundingClientRect();
                    var popup = document.getElementById('popup');
                    if (popup) {
                        popup.style.display = 'block';
                        popup.style.top = (rect.bottom + window.scrollY) + 'px';
                        popup.style.left = (rect.left + window.scrollX - popup.offsetWidth) + 'px';
                    }
                });
            });
        }
    
        // Tambahkan event listener untuk menutup popup saat mengklik di luar popup atau tombol more
        document.addEventListener('click', function (event) {
            var popup = document.getElementById('popup');
            var moreButtons = document.querySelectorAll('.more-button');
            var isOutsidePopup = true;
    
            // Periksa apakah event target berada di luar popup
            if (popup && popup.style.display === 'block') {
                if (event.target !== popup && !popup.contains(event.target)) {
                    moreButtons.forEach(function (button) {
                        if (event.target === button) {
                            isOutsidePopup = false;
                        }
                    });
    
                    if (isOutsidePopup) {
                        popup.style.display = 'none';
                    }
                }
            }
        });
    
        // Temukan tombol untuk menghapus informasi
        var hapusButton = document.getElementById('hapusBtn');
        if (hapusButton) {
            // Tambahkan event listener untuk menangani penghapusan informasi
            hapusButton.addEventListener('click', function () {
                // Tambahkan logika untuk menghapus informasi di sini
                alert('Informasi dihapus');
                // Sembunyikan popup setelah penghapusan
                var popup = document.getElementById('popup');
                if (popup) {
                    popup.style.display = 'none';
                }
            });
        }

        

    });
    
    document.addEventListener('DOMContentLoaded', function() {
        // Ambil elemen popup riwayat
        var popupRiwayat = document.getElementById('popupDetailRiwayat');
    
        // Ambil tombol yang membuka popup riwayat
        var showPopupBtn = document.getElementById('showAllHistory');
    
        // Ambil tombol untuk menutup popup riwayat
        var closePopupBtn = document.getElementById('closePopupDetail');
    
        // Tambahkan event listener untuk tombol yang membuka popup riwayat
        if (showPopupBtn) {
            showPopupBtn.addEventListener('click', function(event) {
                event.preventDefault();
                popupRiwayat.classList.remove('hidden');
            });
        }
    
        // Tambahkan event listener untuk tombol yang menutup popup riwayat
        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', function(event) {
                event.preventDefault();
                popupRiwayat.classList.add('hidden');
            });
        }
    
        // Tambahkan event listener untuk menutup popup riwayat saat klik di luar area popup
        document.addEventListener('click', function(event) {
            var isClickInsidePopup = popupRiwayat.contains(event.target);
            var isClickOnPopupButton = event.target.closest('#showAllHistory');
    
            // Jika klik dilakukan di luar popup dan bukan pada tombol untuk membuka popup
            if (!isClickInsidePopup && !isClickOnPopupButton) {
                popupRiwayat.classList.add('hidden');
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('http://localhost:5000/getAllDonate');
            const data = await response.json();

            if (response.ok) {
                const totalPohon = document.getElementById('totalPohon');
                const totalRelawan = document.getElementById('totalRelawan');
                const totalDana=document.getElementById('totalDana');

                // Mengatur nilai dari database
                totalPohon.textContent = data.donate.reduce((acc, curr) => acc + parseInt(curr.jumlah), 0).toString();
                totalDana.textContent = data.donate.reduce((acc, curr) => acc + parseInt(curr.uang_donasi), 0).toString();
                totalRelawan.textContent = data.donate.length.toString();

            } else {
                console.error('Gagal mengambil data donasi:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });


    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('http://localhost:5000/getAllDonate');
            const data = await response.json();

            if (response.ok) {
                const totalPohon = document.getElementById('totalPohon');
                const totalRelawan = document.getElementById('totalRelawan');
                const donationHistory = document.getElementById('donationHistory');
                const detailDonasi = document.getElementById('detailDonasi');
                const showAllHistory = document.getElementById('showAllHistory');
                const popupDetailRiwayat = document.getElementById('popupDetailRiwayat');
                const closePopupDetail = document.getElementById('closePopupDetail');

                // Mengatur nilai dari database
                totalPohon.textContent = data.donate.reduce((acc, curr) => acc + parseInt(curr.jumlah), 0).toString();
                totalRelawan.textContent = data.donate.length.toString();
                // Urutkan data donasi berdasarkan createdAt secara descending
                data.donate.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Render daftar donasi (maksimal 3)
                data.donate.slice(0, 3).forEach(donate => {
                    const li = document.createElement('li');
                    li.classList.add('p-4', 'border-b', 'border-gray-200', 'flex', 'items-center');

                    const img = document.createElement('img');
                    img.src = 'foto/user.png';
                    img.alt = 'User Foto';
                    img.classList.add('w-12', 'h-12', 'rounded-full', 'border-2');
                    img.style.borderColor = 'var(--hijau-tua)';
                    img.style.marginRight = '16px';

                    const div = document.createElement('div');

                    const pohonDonasi = document.createElement('p');
                    pohonDonasi.classList.add('font-bold', 'text-lg');
                    pohonDonasi.textContent = `${donate.jumlah} Pohon`;

                    const namaDonatur = document.createElement('p');
                    namaDonatur.classList.add('text-sm');
                    namaDonatur.innerHTML = `Oleh <span class="italic">${donate.nama}</span>`;

                    const tanggalDonasi = document.createElement('p');
                    tanggalDonasi.classList.add('text-xs', 'text-gray-500');
                    tanggalDonasi.textContent = new Date(donate.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });


                    div.appendChild(pohonDonasi);
                    div.appendChild(namaDonatur);
                    div.appendChild(tanggalDonasi);

                    li.appendChild(img);
                    li.appendChild(div);

                    donationHistory.appendChild(li);
                });

                // Render daftar donasi detail
                data.donate.forEach(donate => {
                    const li = document.createElement('li');
                    li.classList.add('p-4', 'border-b', 'border-gray-200', 'flex', 'items-center');

                    const img = document.createElement('img');
                    img.src = 'foto/user.png';
                    img.alt = 'User Foto';
                    img.classList.add('w-12', 'h-12', 'rounded-full', 'border-2');
                    img.style.borderColor = 'var(--hijau-tua)';
                    img.style.marginRight = '16px';

                    const div = document.createElement('div');

                    const pohonDonasi = document.createElement('p');
                    pohonDonasi.classList.add('font-bold', 'text-lg');
                    pohonDonasi.textContent = `${donate.jumlah} Pohon`;

                    const namaDonatur = document.createElement('p');
                    namaDonatur.classList.add('text-sm');
                    namaDonatur.innerHTML = `Oleh <span class="italic">${donate.nama}</span>`;

                    const tanggalDonasi = document.createElement('p');
                    tanggalDonasi.classList.add('text-xs', 'text-gray-500');
                    tanggalDonasi.textContent = new Date(donate.createdAt).toLocaleDateString();

                    div.appendChild(pohonDonasi);
                    div.appendChild(namaDonatur);
                    div.appendChild(tanggalDonasi);

                    li.appendChild(img);
                    li.appendChild(div);

                    detailDonasi.appendChild(li);
                });


                // Event listener untuk tombol "Lihat Semua Donasi"
                showAllHistory.addEventListener('click', () => {
                    popupDetailRiwayat.classList.remove('hidden');
                });

                // Event listener untuk menutup popup
                closePopupDetail.addEventListener('click', () => {
                    popupDetailRiwayat.classList.add('hidden');
                });
            } else {
                console.error('Gagal mengambil data donasi:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    document.addEventListener('DOMContentLoaded', async function () {
        try {
            const response = await fetch('http://localhost:5000/getAllInformasi');
            const data = await response.json();
            const informasiContainer = document.getElementById('informasi');
    
            // Mengisi konten informasi
            data.Informasi.forEach(info => {
                const infoBox = document.createElement('div');
                infoBox.classList.add('relative', 'bg-white', 'rounded-lg', 'border', 'border-gray-200', 'shadow-md', 'p-4', 'flex', 'flex-col', 'space-y-9');
                infoBox.style.backgroundColor = 'var(--putihbg)';
    
                infoBox.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <img src="foto/user.png" alt="User Foto" class="w-8 h-8">
                        <div class="flex-grow">
                            <p class="text-sm font-semibold break-words">${info.nama}</p>
                            <p class="text-xs text-gray-500">${new Date(info.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <button class="more-button" aria-label="More Options"></button>
                    </div>
                    <p class="text-sm break-words">Pada lokasi mangrove di <span>${info.kota}</span>, <span>${info.provinsi}</span>, <span>${info.detail}</span></p>
                `;
    
                informasiContainer.appendChild(infoBox);
    
                // Menambahkan popup untuk setiap infoBox
                const popup = document.createElement('div');
                popup.classList.add('popup');
                popup.innerHTML = `
                    <button id="hapusBtn" class="text-xs md:text-sm">Hapus Informasi</button>
                `;
                infoBox.appendChild(popup);
    
                // Event listener untuk tombol "More Options"
                const moreButton = infoBox.querySelector('.more-button');
                moreButton.addEventListener('click', function (event) {
                    event.stopPropagation(); // Mencegah event bubbling
                    
                    // Toggle untuk menampilkan atau menyembunyikan popup
                    const isVisible = popup.style.display === 'block';
                    closeAllPopups(); // Sembunyikan semua popup sebelum menampilkan yang saat ini diklik
                    popup.style.display = isVisible ? 'none' : 'block';
                    popup.style.left = `${moreButton.offsetLeft}px`;
                    popup.style.top = `${moreButton.offsetTop + moreButton.offsetHeight}px`;
                });
    
                // Event listener untuk tombol "Hapus Informasi" di popup
                const closeButton = popup.querySelector('#hapusBtn');
                closeButton.addEventListener('click', async function () {
                    try {
                        // Ambil ID informasi yang ingin dihapus dari 'info'
                        const idToDelete = info.id; // Sesuaikan dengan cara Anda mengambil ID dari data
    
                        // Kirim permintaan DELETE ke server
                        const deleteResponse = await fetch('http://localhost:5000/deleteInformasi', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: idToDelete }),
                        });
    
                        const deleteData = await deleteResponse.json();
    
                        if (deleteResponse.ok) {
                            // Hapus infoBox dari antarmuka pengguna jika penghapusan berhasil
                            informasiContainer.removeChild(infoBox);
                            alert(deleteData.message); // Tampilkan pesan sukses dalam alert
                        } else {
                            console.error(deleteData.message); // Optional: Handle error message
                            alert(deleteData.message); // Tampilkan pesan error dalam alert
                        }
                    } catch (error) {
                        console.error('Gagal menghapus informasi:', error);
                        alert('Gagal menghapus informasi'); // Tampilkan pesan error dalam alert
                    }
                });
    
                function closeAllPopups() {
                    const allPopups = document.querySelectorAll('.popup');
                    allPopups.forEach(popup => popup.style.display = 'none');
                }
    
            });
    
        } catch (error) {
            console.error('Gagal mengambil data informasi:', error);
        }
    });  