---
title: "A Novel File Entropy Dataset for Crypto-Ransomware Detection Using Machine Learning"
collection: publications
category: book-chapters
excerpt: ''
date: 2025-07-25
venue: '2nd International Conference on Machine Intelligence and Emerging Technologies'
slidesurl: 'http://nabin47.github.io/files/A-novel-file-entropy-dataset-for-crypto-ransomware-detection-using-ml-slide.pdf'
paperurl: '[http://nabin47.github.io/files/A Novel File Entropy Dataset for Crypto Ransomware Detection Using Machine Learning.pdf]http://dx.doi.org/10.1007/978-981-96-2721-9_20)'
bibtexurl: '[http://nabin47.github.io/files/bibtex1.bib](https://scholar.googleusercontent.com/scholar.bib)'
citation: 'Ahmed Nabin, J., & Haque, M. M. (2024, November). A Novel File Entropy Dataset for Crypto-Ransomware Detection Using Machine Learning. In International Conference on Machine Intelligence and Emerging Technologies (pp. 299-314). Singapore: Springer Nature Singapore.'
---
Crypto-ransomware is a looming threat that has been terrorizing cyberspace for a long time. This issue has reached a critical point in recent years when every facet of life is computer-reliant. This paper presents a novel file entropy dataset that can be leveraged to detect crypto-ransomware in real time. We developed a Filesystem in Userspace (FUSE)-based filesystem that resides in the user-space of the operating system. This filesystem is capable of intercepting file write and delete operations thus enabling the collection of entropy data across various file types. Our dataset comprises 24,600 data points, split equally between file write and delete operations, with each set containing 12,300 data points. We collected 100 samples each from 123 different file types. Among these, 30 types represent the entropy of the files encrypted by 30 different ransomware strains, while the remaining 93 are benign. We leveraged this dataset to train machine learning models, achieving up to 96% accuracy in differentiating between benign and ransomware-encrypted files. This high accuracy in initial testing demonstrates the potency of file entropy analysis in building a machine learning-based real-time crypto-ransomware detection system.