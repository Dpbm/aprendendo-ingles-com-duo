from docx import Document
from re import compile
from markdown import markdown

doc = Document('../docs/ingles.docx')

paragraphs = doc.paragraphs
pattern_regex = compile(r'[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]')

actual_date = ''
continue_writing_md_file = False

external = {
    "11-12-2021": [
        {
            "type": "link",
            "text": r"https://www.musixmatch.com/lyrics/Martin-Garrix-Matisse-Sadko-John-Martin/Won-t-Let-You-Go"
        },
        {
            "type": "link",
            "text": r"https://youtu.be/uEOSEW9LSJ4"
        }
    ],
    "16-12-2021": [
        {
            "type": "link",
            "text": "https://www.youtube.com/watch?v=TKZTvdeeSFE"
        }
    ],
    "06-01-2022": [
        {
            "type": "table",
            "text": """
                Sujeito     | Verbo
                ----------- | -------------
                I           | Am (sou / estou)
                You         | Are (é / está / estás)
                He She it   | Is (é / está)
            """
        }
    ],
    "11-01-2022": [
        {
            "type": "table",
            "text": """
                Sujeito                                    | Verbo
                ------------------------------------------ | ---------------------
                I(eu)                                      | Have (tenho)
                You(voce, voces), they(
                    eles, elas)         | Have (tens, tem, têm)
                He(ele) she(ela) it(ele ela para coisas)   | Has (tem)
            """
        }
    ],
    "12-01-2022": [
        {
            "type": "table",
            "text": """
                Sujeito                    | Verbo
                -------------------------- | -------------
                I                          | Am (sou / estou)
                You, they, we(nós)         | Are (é / está / estás)
                He She it                  | Is (é / está)
            """
        }
    ]
}


for paragraph in paragraphs:

    if(pattern_regex.match(paragraph.text)):
        print('dia --> ', actual_date)

        if(actual_date):
            try:
                external_data = external[actual_date]

                if(external_data):
                    with open(f'../notes/{actual_date}.md', 'a') as md_file:

                        for data in external_data:
                            if(data['type'] == 'link'):
                                md_file.write(markdown(data['text']))

                            elif(data['type'] == 'table'):
                                md_file.write(markdown(
                                    data['text'], extensions=['tables']))
            except:
                pass

        actual_date = paragraph.text.replace('/', '-')
        continue_writing_md_file = False

    else:
        continue_writing_md_file = True

    if(actual_date and continue_writing_md_file):
        with open(f'../notes/{actual_date}.md', 'a') as md_file:
            md_file.write(markdown(paragraph.text))
